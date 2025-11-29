# ---------- PHP base ----------
FROM php:8.2-fpm AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx curl gnupg zip unzip git ca-certificates \
    libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev libzip-dev libcurl4-openssl-dev \
    nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd zip curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# PHP & Nginx config
COPY ./php.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./nginx/laravel.conf /etc/nginx/sites-available/default

# Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---------- Frontend builder (Node 24.1.0 + pnpm 10.11.1) ----------
FROM node:24.1.0 AS frontend
WORKDIR /app

# Install pnpm v10.11.1
RUN npm i -g pnpm@10.11.1

# Install dependencies (cache-friendly)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source for Vite (and wayfinder types)
COPY resources/ resources/
COPY public/ public/
COPY vite.config.* .

# --- Wayfinder: Generate types before build ---
# Laravel/wayfinder relies on a PHP command, needs the PHP app code and vendor deps.
# We'll copy only what is strictly needed to run wayfinder:generate for correct type output.
FROM base AS wayfinder
WORKDIR /var/www/html

# Copy only app & vendor needed for wayfinder types
COPY composer.json ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-scripts

COPY . /var/www/html
# Pastikan konfigurasi sudah benar (env, routes)
# Jalankan wayfinder:generate (hasilkan tipe TS di resources/)
RUN php artisan wayfinder:generate --ansi

# --- End Wayfinder stage ---

# Salin hasil types wayfinder dari stage sebelumnya ke frontend
COPY --from=wayfinder /var/www/html/resources/ts/ /app/resources/ts/

# Build production assets (after wayfinder types exist!)
RUN pnpm run build

# ---------- Composer vendor (cache-friendly) ----------
FROM base AS vendor
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-scripts

# ---------- App final ----------
FROM base AS app

# Copy source code
COPY . /var/www/html
COPY .env.gcp-prod /var/www/html/.env

# Vendor dari stage vendor
COPY --from=vendor /var/www/html/vendor /var/www/html/vendor

# Asset Vite hasil build
COPY --from=frontend /app/public/build /var/www/html/public/build

# Permission & dirs
RUN mkdir -p /var/lib/nginx/body /var/lib/nginx/fastcgi /var/lib/nginx/proxy /var/lib/nginx/scgi /var/lib/nginx/uwsgi \
    && chown -R www-data:www-data /var/lib/nginx \
    && mkdir -p /var/log/nginx /var/log/php-fpm \
    && chown -R www-data:www-data /var/log/nginx /var/log/php-fpm \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Entrypoint: artisan dijalankan di runtime (env Cloud Run sudah valid)
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV PORT=8080
EXPOSE 8080
CMD ["/entrypoint.sh"]
