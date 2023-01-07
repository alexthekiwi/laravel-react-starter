import { Head, useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Layout from '@/layouts/Layout';
import { handleChange } from '@/lib/forms';

interface Props {
    status?: string;
}

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('password.email'));
    }

    return (
        <Layout>
            <Head title="Forgot Password" />

            <div className="container py-12">
                <Card className="mx-auto max-w-xl">
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

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
                        <div className="flex gap-6">
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
