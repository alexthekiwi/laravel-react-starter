import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Providers from './components/common/Providers';

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'MyApp';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Providers>
                <App {...props} />
            </Providers>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
