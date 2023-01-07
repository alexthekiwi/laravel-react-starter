import React, { useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import route from 'ziggy-js';
import Button from '@/components/common/Button';
import { handleChange } from '@/lib/forms';

interface Props {
    className?: string;
}

export default function UpdatePasswordForm({ className }: Props) {
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function updatePassword(e: React.FormEvent) {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <label>
                    Password
                    <input
                        // @ts-ignore
                        ref={currentPasswordInput}
                        id="current_password"
                        type="password"
                        name="current_password"
                        value={data.current_password}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.current_password && (
                        <span className="error">{errors.current_password}</span>
                    )}
                </label>

                <label>
                    Password
                    <input
                        // @ts-ignore
                        ref={passwordInput}
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}
                </label>
                <label>
                    Confirm password
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            handleChange({ event: e, data, setData })
                        }
                    />
                    {errors.password_confirmation && (
                        <span className="error">
                            {errors.password_confirmation}
                        </span>
                    )}
                </label>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
