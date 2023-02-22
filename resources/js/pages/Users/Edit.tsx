import { Head } from '@inertiajs/react';
import Layout from '@/layouts/Layout';
import UserForm from '@/components/users/UserForm';
import { useAuth } from '@/lib/auth';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import type { App } from '@/types';

interface Props {
    user: App['Models']['User'];
    groups?: App['Models']['Group'][];
}

export default function UsersEdit({ user, groups }: Props) {
    const { currentGroup } = useAuth();

    return (
        <Layout>
            <Head title={`${user.name} | Users`} />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    {user.name}
                </h1>

                <div className="flex items-center justify-end gap-6">
                    {currentGroup && (
                        <Button href={`/groups/${currentGroup.id}`}>
                            Go back
                        </Button>
                    )}
                </div>

                <Card className="mx-auto w-full max-w-xl">
                    <UserForm user={user} groups={groups} />
                </Card>
            </div>
        </Layout>
    );
}
