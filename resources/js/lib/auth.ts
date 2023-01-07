import { usePage } from '@inertiajs/inertia-react';
import type {
    ErrorBag,
    Errors,
    Page,
    PageProps as PagePropsInterface,
} from '@inertiajs/inertia';

interface AuthContext {
    user: App.Models.User;
    isAuth: boolean;
}

interface PageProps extends Page<PagePropsInterface> {
    props: {
        auth: AuthContext;
        errors: Errors & ErrorBag;
    };
}

export function useAuth(): AuthContext {
    const { props } = usePage<PageProps>();

    return {
        user: props.auth.user,
        isAuth: Boolean(props.auth.user),
    };
}
