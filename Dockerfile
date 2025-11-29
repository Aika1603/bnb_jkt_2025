# ---------- PHP base ----------
FROM php:8.2-fpm AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx curl gnupg zip unzip git ca-certificates \
    libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev libzip-dev libcurl4-openssl-dev \
    nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) pdo_mysql mbstring exif pcntl bcmath gd zip curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*.deb

# Install Node.js 24.x dan pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm@10.11.1 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# PHP & Nginx config
COPY ./php.ini /usr/local/etc/php/conf.d/custom.ini
COPY ./nginx/laravel.conf /etc/nginx/sites-available/default

# Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---------- Composer vendor (cache-friendly) ----------
FROM base AS vendor
COPY composer.json ./
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-scripts

# ---------- App final ----------
FROM base AS app

# Copy source code
COPY . /var/www/html
COPY .env.example /var/www/html/.env

# Vendor dari stage vendor
COPY --from=vendor /var/www/html/vendor /var/www/html/vendor

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
