<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite('resources/css/app.css')
        @yield('head')

        <style>
            html {
                -webkit-print-color-adjust: exact;
            }
        </style>
    </head>
    <body class="antialiased flex flex-col relative p-4">
        <main>
            @yield('body')
        </main>
    </body>
</html>
