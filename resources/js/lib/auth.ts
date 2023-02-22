import { usePage } from '@inertiajs/react';
import type { ErrorBag, Errors, Page, PageProps } from '@inertiajs/core';
import { App } from '@/types';

type CurrentGroup = App['Models']['Group'] & {
    is_owner: boolean;
};

type AuthContext = {
    user: App['Models']['User'];
    currentGroup?: CurrentGroup;
    isAuth: boolean;
    can: (ability: string) => boolean;
};

type AppPage = {
    props: PageProps & SharedProps;
} & Page;

type SharedProps = {
    auth: AuthContext;
    errors: Errors & ErrorBag;
};

export function useAuth(): AuthContext {
    const { props } = usePage() as AppPage;
    const isAuth = Boolean(props.auth.user);

    function can(ability: string): boolean {
        if (!isAuth) {
            return false;
        }

        return (
            props.auth.currentGroup?.role?.permissions?.find(
                (permission: any) => permission.name === ability
            ) !== undefined || false
        );
    }

    return {
        user: props.auth.user,
        currentGroup: props.auth.currentGroup,
        isAuth,
        can,
    };
}
