import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { handleChange } from '@/lib/forms';

interface Props {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    useEffect(
        () => () => {
            reset('password', 'password_confirmation');
        },
        []
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <Layout>
            <Head title="Reset Password" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
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
                        <label>
                            Confirm password
                            <input
                                id="password"
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
                        <div className="flex gap-6">
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
