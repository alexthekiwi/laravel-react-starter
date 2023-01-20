import { Head, Link, useForm } from '@inertiajs/react';
import { Method } from '@inertiajs/core';
import React from 'react';
import route from 'ziggy-js';
import Card from '@/components/common/Card';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';

interface Props {
    status?: string;
}

export default function VerifyEmail({ status }: Props) {
    const { post, processing } = useForm();

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('verification.send'));
    }

    return (
        <Layout>
            <Head title="Email Verification" />

            <div className="container my-24 max-w-2xl">
                <Card>
                    <div className="mb-4 text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>
                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}
                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center gap-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Resend Verification Email
                            </Button>
                            <Link
                                href={route('logout')}
                                method={Method.POST}
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
