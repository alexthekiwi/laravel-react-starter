import { Head } from '@inertiajs/inertia-react';
import Layout from '@/layouts/Layout';
import type { Role } from '@/types';
import GroupForm from '@/components/users/GroupForm';
import Card from '@/components/common/Card';

interface Props {
    group: App.Models.Group;
    roles: Role[];
}

export default function GroupsEdit({ group, roles }: Props) {
    return (
        <Layout>
            <Head title={`Edit ${group.name} | Groups`} />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit {group.name}
                </h1>

                <Card className="mx-auto w-full max-w-xl">
                    <GroupForm group={group} roles={roles} />
                </Card>
            </div>
        </Layout>
    );
}
