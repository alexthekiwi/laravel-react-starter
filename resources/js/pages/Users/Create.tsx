import { Head } from '@inertiajs/inertia-react';
import Layout from '@/layouts/Layout';
import UserForm from '@/components/users/UserForm';
import Button from '@/components/common/Button';
import { useAuth } from '@/lib/auth';
import Card from '@/components/common/Card';

interface Props {
    groups?: App.Models.Group[];
}

export default function UsersCreate({ groups }: Props) {
    const { currentGroup } = useAuth();

    return (
        <Layout>
            <Head title="Create | Users" />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    New user
                </h1>

                <div className="flex items-center justify-end gap-6">
                    {currentGroup && (
                        <Button href={`/groups/${currentGroup.id}`}>
                            Go back
                        </Button>
                    )}
                </div>

                <Card className="mx-auto w-full max-w-xl">
                    <UserForm groups={groups} />
                </Card>
            </div>
        </Layout>
    );
}
