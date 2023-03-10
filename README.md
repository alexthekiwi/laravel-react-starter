# Laravel React Starter
This project uses Vite with React.js, TypeScript and TailwindCSS. It comes with some dependencies pre-installed and configured as a solid base for a new project. It is based on Laravel Breeze, but customised to support TypeScript and make the React page templates/components simpler.

See `./composer.json` and `./package.json` for the full list of pre-installed and configured dependencies.

## Installation
Replace all instances of "MyApp". This appears in the following files:
- /config/app.php
- .env.example (`DB_DATABASE`)
- /resources/js/app.tsx
- /resources/js/ssr.tsx
- /resources/js/components/common/Header.tsx
- /resources/js/components/common/Footer.tsx

Create an environment file, and populate it according to your local setup:
```
cp .env.example .env
```

Install PHP dependencies:
```
composer install
```

Install JavaScript dependencies:
```
npm install
```

Generate an application key:
```
php artisan key:generate
```

Migrate the database:
```
php artisan migrate
```

**Note: I set the timezone in `/config/app.php` to "Pacific/Auckland". Change this to suit.**

---

### PDF generation with Puppeteer and Browsershot
If you're wanting to generate PDFs with Browsershot, you'll need to do the following.

Install puppeteer as a global node_module:
```
npm i --location=global puppeteer
```

Run the following to get the corresponding variables for your `.env` file:
```
which node   # NODE_BINARY
which npm    # NPM_BINARY
npm list -g  # NODE_MODULES_PATH (add "/node_modules" to the result)
```

---

## Development
To start a dev server with Hot-Module-Reloading (HMR) for your TypeScript files:
```
npm run dev
```

Start the PHP server with:
```
php artisan serve
```

Or run the app with Laravel Sail (in Docker containers) with:
```
sail up -d
```
(Omit the "-d" to not use detached mode)

Otherwise you can use [Laravel Valet](https://laravel.com/docs/9.x/valet) to run the site on a local domain, e.g. "http://myapp.test".

---

## Hosting
If you're using Laravel Forge, use the following as your "Deploy Script":

```sh
# Pull the latest version
cd $FORGE_SITE_PATH
git pull origin $FORGE_SITE_BRANCH

# Install PHP dependencies
$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader

# Reload PHP-FPM
( flock -w 10 9 || exit 1
    echo 'Restarting FPM...'; sudo -S service $FORGE_PHP_FPM reload ) 9>/tmp/fpmlock

if [ -f artisan ]; then
    # Migrate the database
    $FORGE_PHP artisan migrate --force

    # Re-sync the schedule monitor
    $FORGE_PHP artisan schedule-monitor:sync

    # Clear and re-cache the config
    $FORGE_PHP artisan config:cache
fi

if [ -f package.json ]; then
    # Install dependencies
    npm install

    # Compile front-end assets
    npm run build
fi
```

## Nginx caching
It's suggested that you cache static assets. Because Vite generates a unique hash for static CSS and JS files, there shouldn't be any issues with caching old versions. To enable caching via nginx, edit your Nginx configuration file and add the following (anywhere within the `server` block).
```
# Cache static assets
location ~* \.(css|gif|jpg|js|png|ico|otf|ttf|woff|woff2|jpeg|webp)$ {
    access_log off;
    expires max;
}
```
