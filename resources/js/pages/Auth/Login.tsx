import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { handleChange, useSubmit } from '@/lib/forms';

interface Props {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    const onSubmit = useSubmit({ message: 'Login successful!' });

    useEffect(
        () => () => {
            reset('password');
        },
        []
    );

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('login'), onSubmit);
    }

    return (
        <Layout>
            <Head title="Log in" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    <form className="flex flex-col gap-8" onSubmit={submit}>
                        <label>
                            Email
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.email && (
                                <span className="error">{errors.email}</span>
                            )}
                        </label>
                        <label>
                            Password
                            <input
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
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                value={data.remember}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            <span>Remember me</span>
                        </label>
                        <div className="flex gap-6">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
