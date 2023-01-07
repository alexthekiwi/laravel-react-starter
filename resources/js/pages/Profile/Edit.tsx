import { Head } from '@inertiajs/inertia-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Layout from '@/layouts/Layout';
import Card from '@/components/common/Card';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <Layout>
            <Head title="Profile" />
            <div className="container py-12">
                <h1 className="mb-8 text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h1>

                <div className="flex flex-col gap-8">
                    <Card>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </Card>
                    <Card>
                        <UpdatePasswordForm />
                    </Card>
                    <Card>
                        <DeleteUserForm />
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
