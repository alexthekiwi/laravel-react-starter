<?php

namespace App\Actions;

use Spatie\Browsershot\Browsershot;

class GeneratePdf
{
    /**
     * Gets a configured instance of Browsershot
     *
     * @param  string  $html (A string of the HTML to render)
     * @param  bool  $isUrl (Whether the $html is a URL or not)
     */
    public function __invoke(string $html, bool $isUrl = false, int $timeout = 360): Browsershot
    {
        $browsershot = ($isUrl) ? Browsershot::url($html) : Browsershot::html($html);

        $browsershot
            ->setNodeBinary(config('services.browsershot.node_binary'))
            ->setNpmBinary(config('services.browsershot.npm_binary'))
            ->setNodeModulePath(config('services.browsershot.node_modules_path'));

        // Disable sandbox when puppeteer is running in Docker
        if (config('app.env') === 'local') {
            $browsershot
                ->noSandbox()
                ->timeout($timeout);
        }

        return $browsershot;
    }
}
