import { Head, Link } from '@inertiajs/inertia-react';
import { upperFirst } from 'lodash';
import route from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';
import { PaginatedResults } from '@/types';
import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/common/SearchBar';
import { useSubmit } from '@/lib/forms';

interface Props {
    groups: PaginatedResults<App.Models.Group[]>;
}

export default function GroupsIndex({ groups }: Props) {
    const onDelete = useSubmit({
        message: 'Group deleted successfully.',
    });

    function handleDeleteGroup(group: App.Models.Group) {
        if (!confirm(`Are you sure you want to delete ${group.name}?`)) {
            return;
        }

        const willDeleteUsers = confirm(
            'Would you like to delete all of the users within this group?'
        );

        if (willDeleteUsers) {
            Inertia.delete(`/groups/${group.id}?withUsers`, onDelete);
            return;
        }

        Inertia.delete(`/groups/${group.id}`, onDelete);
    }

    return (
        <Layout>
            <Head title="Groups" />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Groups
                </h1>

                <div className="flex items-center justify-end gap-6">
                    <Button href="/groups/create">Create group</Button>
                    <Button href="/users">View users</Button>
                </div>

                <SearchBar path={route('groups.index')} />

                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {groups.data.map((group) => (
                                        <tr key={group.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {group.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {upperFirst(
                                                    group.role?.name || '---'
                                                )}
                                            </td>
                                            <td className="relative flex items-center justify-end gap-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link
                                                    href={`/groups/${group.id}`}
                                                    className="text-blue-400"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/groups/${group.id}/edit`}
                                                    className="text-blue-400"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteGroup(group)
                                                    }
                                                    className="text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Pagination
                    results={groups}
                    sortOptions={[
                        { name: 'Name, asc', value: 'name_asc' },
                        { name: 'Name, desc', value: 'name_desc' },
                    ]}
                />
            </div>
        </Layout>
    );
}
