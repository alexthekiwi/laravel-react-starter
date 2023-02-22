import { Head } from '@inertiajs/react';
import Layout from '@/layouts/Layout';
import GroupForm from '@/components/users/GroupForm';
import Card from '@/components/common/Card';
import type { App } from '@/types';

interface Props {
    group: App['Models']['Group'];
    roles: App['Models']['Role'][];
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
