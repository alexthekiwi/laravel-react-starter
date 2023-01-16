import { Head } from '@inertiajs/inertia-react';
import Layout from '@/layouts/Layout';
import type { Role } from '@/types';
import GroupForm from '@/components/users/GroupForm';
import Card from '@/components/common/Card';

interface Props {
    roles: Role[];
}

export default function GroupsCreate({ roles }: Props) {
    return (
        <Layout>
            <Head title="Create | Groups" />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Create group
                </h1>

                <Card className="mx-auto w-full max-w-xl">
                    <GroupForm roles={roles} />
                </Card>
            </div>
        </Layout>
    );
}
