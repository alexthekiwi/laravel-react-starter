import { Head, useForm } from '@inertiajs/react';
import route from 'ziggy-js';
import React from 'react';
import Layout from '@/layouts/Layout';
import { useAuth } from '@/lib/auth';
import { handleChange, useSubmit } from '@/lib/forms';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface Props {
    groups: App.Models.Group[];
}

export default function GroupsSwitchIndex({ groups }: Props) {
    const { currentGroup } = useAuth();

    const onSubmit = useSubmit({ message: 'Group switched successfully!' });

    const { data, setData, post } = useForm({
        group_id: currentGroup?.id,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post(route('group-switch.store'), onSubmit);
    }

    return (
        <Layout>
            <Head title="Change Group" />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Switch group
                </h1>

                <Card className="mx-auto w-full max-w-xl">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-6"
                    >
                        <label>
                            Group
                            <select
                                name="group_id"
                                id="group_id"
                                value={data.group_id}
                                onChange={(event) =>
                                    handleChange({ event, data, setData })
                                }
                            >
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Button className="ml-auto" type="submit">
                            Switch group
                        </Button>
                    </form>
                </Card>
            </div>
        </Layout>
    );
}
