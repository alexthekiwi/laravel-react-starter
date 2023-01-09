import { Head, useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import route from 'ziggy-js';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Layout from '@/layouts/Layout';
import { handleChange } from '@/lib/forms';

interface Props {
    status?: string;
}

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(
        () => () => {
            reset('password');
        },
        []
    );

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(route('password.confirm'));
    }

    return (
        <Layout>
            <Head title="Confirm Password" />

            <div className="container my-24">
                <Card className="mx-auto max-w-xl">
                    <div className="mb-4 text-sm text-gray-600">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form className="flex flex-col gap-8" onSubmit={submit}>
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

                        <div className="flex gap-6">
                            <Button
                                className="ml-auto"
                                type="submit"
                                disabled={processing}
                                theme="primary"
                            >
                                Confirm
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
