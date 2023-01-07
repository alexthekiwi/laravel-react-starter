import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { handleChange } from '@/lib/forms';

interface Props {
    status?: string;
}

export default function Register({ status }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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

        post(route('register'));
    };

    return (
        <Layout>
            <Head title="Register" />

            <div className="container py-12">
                <Card className="mx-auto max-w-xl">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    <form className="flex flex-col gap-8" onSubmit={submit}>
                        <label>
                            Name
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.name && (
                                <span className="error">{errors.name}</span>
                            )}
                        </label>
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
                        <div className="flex gap-6">
                            <Link
                                href={route('login')}
                                className="text-sm underline"
                            >
                                Already registered?
                            </Link>
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
