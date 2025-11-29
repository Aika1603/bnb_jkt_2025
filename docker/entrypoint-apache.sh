#!/usr/bin/env bash
set -e

run_as_wwwdata() {
  su -s /bin/sh -c "$1" www-data
}

# Permission aman
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true

# Jalankan artisan di runtime (ENV sudah valid dari Cloud Run)
if [ -f "/var/www/html/artisan" ]; then
  # Generate key jika belum ada
  if [ -z "${APP_KEY}" ]; then
    echo "APP_KEY tidak terdeteksi, generate..."
    run_as_wwwdata "php artisan key:generate --force" || true
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
fi

# Jalankan Apache sebagai foreground process (ini menjaga container tetap hidup)
echo "Starting Apache (apache2-foreground)..."
exec apache2-foreground
