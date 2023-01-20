import { router, Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import Layout from '@/layouts/Layout';
import Button from '@/components/common/Button';
import { PaginatedResults } from '@/types';
import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/common/SearchBar';
import { useAuth } from '@/lib/auth';
import { useSubmit } from '@/lib/forms';

interface Props {
    users: PaginatedResults<App.Models.User[]>;
}

export default function UsersIndex({ users }: Props) {
    const { can } = useAuth();

    const isAdmin = can('admin');

    const onProxy = useSubmit({
        message: 'You are now impersonating another user.',
    });

    const onDelete = useSubmit({
        message: 'User deleted successfully.',
    });

    function handleUserProxy(id: number) {
        if (!isAdmin) {
            return;
        }

        router.post('/user-proxy', { user_id: id }, onProxy);
    }

    function handleDeleteUser(user: App.Models.User) {
        if (!confirm(`Are you sure you want to delete ${user.name}?`)) {
            return;
        }

        router.delete(`/users/${user.id}`, onDelete);
    }

    return (
        <Layout>
            <Head title="Users" />

            <div className="container mt-12 mb-24 flex flex-col gap-8">
                <h1 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h1>

                <div className="flex items-center justify-end gap-6">
                    <Button href="/users/create">Create user</Button>
                    <Button href="/groups">View groups</Button>
                </div>

                <SearchBar path={route('users.index')} />

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
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Verified
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
                                    {users.data.map((user) => (
                                        <tr key={user.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.title ?? '---'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {user.email_verified_at
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                            <td className="relative flex justify-end gap-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link
                                                    href={`/users/${user.id}/edit`}
                                                    className="text-blue-400"
                                                >
                                                    Edit
                                                    <span className="sr-only">
                                                        , {user.name}
                                                    </span>
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleUserProxy(user.id)
                                                    }
                                                    className="text-blue-400"
                                                >
                                                    Impersonate
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteUser(user)
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
                    results={users}
                    sortOptions={[
                        { name: 'Name, asc', value: 'name_asc' },
                        { name: 'Name, desc', value: 'name_desc' },
                        { name: 'Email, asc', value: 'email_asc' },
                        { name: 'Email, desc', value: 'email_desc' },
                    ]}
                />
            </div>
        </Layout>
    );
}
