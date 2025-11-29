#!/usr/bin/env bash
set -e

run_as_wwwdata() {
  su -s /bin/sh -c "$1" www-data
}

# Permission aman
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true
# Pastikan direktori build ada dan memiliki permission yang benar
mkdir -p /var/www/html/public/build || true
chown -R www-data:www-data /var/www/html/public/build || true
chmod -R 775 /var/www/html/public/build || true

# Jalankan artisan di runtime (ENV sudah valid dari Cloud Run)
if [ -f "/var/www/html/artisan" ]; then
  # Generate key jika belum ada
  if [ -z "${APP_KEY}" ]; then
    echo "APP_KEY tidak terdeteksi, generate..."
    run_as_wwwdata "php artisan key:generate --force"
  fi

  # Idempotent ops
  run_as_wwwdata "php artisan storage:link" || true
  run_as_wwwdata "php artisan package:discover --ansi" || true

  # Optional caches (boleh dimatikan kalau sering gonta-ganti config)
  run_as_wwwdata "php artisan config:clear" || true
  run_as_wwwdata "php artisan route:clear" || true
  run_as_wwwdata "php artisan view:clear" || true
  run_as_wwwdata "php artisan config:cache" || true
  run_as_wwwdata "php artisan route:cache" || true
  run_as_wwwdata "php artisan view:cache" || true

  # Generate wayfinder types (sebelum build frontend)
  echo "Generating wayfinder types..."
  run_as_wwwdata "php artisan wayfinder:generate --with-form" || echo "Wayfinder generation failed, continuing..."

  # Build frontend assets dengan pnpm
  if [ -f "/var/www/html/package.json" ]; then
    cd /var/www/html
    
    # Install dependencies jika node_modules belum ada
    if [ ! -d "node_modules" ]; then
      echo "Installing npm dependencies..."
      run_as_wwwdata "pnpm install --frozen-lockfile" || echo "pnpm install failed, continuing..."
    else
      echo "node_modules already exists, skipping install..."
    fi
    
    # Pastikan node_modules memiliki permission yang benar
    chown -R www-data:www-data /var/www/html/node_modules || true
    
    echo "Building frontend assets..."
    run_as_wwwdata "pnpm run build" || echo "Frontend build failed, continuing..."
    
    # Pastikan hasil build memiliki permission yang benar
    chown -R www-data:www-data /var/www/html/public/build || true
  fi
fi

# Start services
php-fpm -D
nginx -g "daemon off;"
