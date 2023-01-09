import React from 'react';
import { VisitOptions } from '@inertiajs/inertia';
import { useToast } from './toast';

interface Props {
    event: React.SyntheticEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
    data: Record<string, any>;
    setData: Function;
}

export function handleChange({ event, data, setData }: Props) {
    if (!Object.keys(data).includes(event.currentTarget.name)) {
        return;
    }

    setData(
        event.currentTarget.name,
        event.currentTarget.type === 'checkbox' ||
            event.currentTarget.type === 'radio'
            ? // @ts-ignore
              event.currentTarget.checked
            : event.currentTarget.value
    );
}

interface UseSubmitOptions {
    message?: string;
    onError?: () => void;
    onSuccess?: () => void;
    onFinish?: () => void;
    preserveScroll?: boolean;
}

export function useSubmit({
    message,
    onSuccess,
    onError,
    onFinish,
    preserveScroll = false,
}: UseSubmitOptions = {}): VisitOptions {
    const { addToast } = useToast();

    return {
        preserveScroll,
        onSuccess: () => {
            addToast({
                message: message ?? 'Success!',
                status: 'success',
            });

            if (onSuccess) {
                onSuccess();
            }
        },
        onError: (errors) => {
            Object.values(errors).forEach((err) => {
                addToast({
                    message: err,
                    status: 'error',
                });
            });

            if (onError) {
                onError();
            }
        },
        onFinish: () => {
            if (onFinish) {
                onFinish();
            }
        },
    };
}
