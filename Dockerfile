# ---------- Unified PHP+Node base ----------
FROM php:8.2-fpm

# Install system dependencies and Node.js (v24.x), pnpm, and Nginx
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx curl gnupg zip unzip git ca-certificates \
    libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev libzip-dev libcurl4-openssl-dev \
    nano \
    && curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && npm i -g pnpm@10.11.1 \
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

# Copy dependency/project files for PHP and Node
COPY composer.json ./
COPY package.json ./

# Install PHP dependencies (prod, vendor cache-friendly)
RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-scripts

# Install Node dependencies (cache-friendly)
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . /var/www/html

# Ensure environment for building and for Laravel Wayfinder types
COPY .env.example /var/www/html/.env

# Run wayfinder:generate to generate TypeScript types
RUN php artisan wayfinder:generate --ansi

# Build frontend assets (Vite, using generated types)
RUN pnpm run build

# Set permissions for Nginx and PHP-FPM
RUN mkdir -p /var/lib/nginx/body /var/lib/nginx/fastcgi /var/lib/nginx/proxy /var/lib/nginx/scgi /var/lib/nginx/uwsgi \
    && chown -R www-data:www-data /var/lib/nginx \
    && mkdir -p /var/log/nginx /var/log/php-fpm \
    && chown -R www-data:www-data /var/log/nginx /var/log/php-fpm \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Entrypoint to run artisan in runtime (env Cloud Run valid)
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set environment variable for the port
ENV PORT=8080
EXPOSE 8080

CMD ["/entrypoint.sh"]
