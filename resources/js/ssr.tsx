// @ts-nocheck
import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Providers from './components/common/Providers';

const appName = 'MyApp';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} | ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx')
            ),
        setup: ({ App, props }) => (
            <Providers>
                <App {...props} />
            </Providers>
        ),
        progress: {
            color: '#4B5563',
        },
    })
);
