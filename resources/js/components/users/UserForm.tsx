import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import { handleChange, useSubmit } from '@/lib/forms';
import Button from '../common/Button';
import { useAuth } from '@/lib/auth';

interface Props {
    user?: App.Models.User;
    groups?: App.Models.Group[];
}

export default function UserForm({ user, groups }: Props) {
    const { can } = useAuth();

    const isAdmin = can('admin');

    const { data, setData, post, put, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        title: user?.title || '',
        password: '',
        password_confirmation: '',
        group_ids: user?.groups?.map((g) => g.id) || [],
    });

    const onSubmit = useSubmit({ message: 'User saved!' });

    function addGroup(id: string) {
        if (!id) return;

        if (data.group_ids.includes(parseInt(id))) return;

        setData('group_ids', [
            ...data.group_ids,
            groups?.find((g) => g.id === parseInt(id))?.id || 0,
        ]);
    }

    function removeGroup(group: App.Models.Group) {
        if (!group) return;

        if (!data.group_ids.includes(group.id)) return;

        setData(
            'group_ids',
            data.group_ids.filter((id) => id !== group.id)
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (user) {
            put(`/users/${user.id}`, onSubmit);
            return;
        }

        post(`/users`, onSubmit);
    }

    const selectableGroups =
        groups?.filter((g) => !data.group_ids.includes(g.id)) || [];

    const appliedGroups =
        groups?.filter((g) => data.group_ids.includes(g.id)) || [];

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <fieldset className="flex flex-col gap-6">
                    <label>
                        Name
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) =>
                                handleChange({ event: e, data, setData })
                            }
                        />
                        {errors.name && (
                            <span className="error">{errors.name}</span>
                        )}
                    </label>
                    <label>
                        Email
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) =>
                                handleChange({ event: e, data, setData })
                            }
                        />
                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </label>
                    <label>
                        Title
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) =>
                                handleChange({ event: e, data, setData })
                            }
                        />
                        {errors.title && (
                            <span className="error">{errors.title}</span>
                        )}
                    </label>
                    <div className="flex flex-col gap-6 md:flex-row">
                        <label className="flex-grow">
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
                            <span className="text-xs">
                                {user
                                    ? 'Leave blank to remain unchanged'
                                    : 'Leave blank to set a random password'}
                            </span>
                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                        </label>
                        <label className="flex-grow">
                            Confirm password
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    handleChange({ event: e, data, setData })
                                }
                            />
                            {errors.password_confirmation && (
                                <span className="error">
                                    {errors.password_confirmation}
                                </span>
                            )}
                        </label>
                    </div>
                </fieldset>

                {isAdmin && (
                    <fieldset className="flex flex-col gap-6">
                        <label>
                            Groups
                            <select
                                name="group_id"
                                id="group_id"
                                onChange={(e) => {
                                    addGroup(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }}
                            >
                                <option value="">Add group</option>
                                {selectableGroups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="flex flex-wrap gap-6">
                            {appliedGroups.map((group) => (
                                <div
                                    className="flex items-center gap-6 rounded bg-gray-100 px-3 py-2 text-xs"
                                    key={group.id}
                                >
                                    <p>{group.name}</p>
                                    <button
                                        title="Remove from group"
                                        className="transition-all hover:opacity-50"
                                        onClick={() => removeGroup(group)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                )}
                <div className="flex justify-end gap-6">
                    <Button type="submit">Save user</Button>
                </div>
            </form>
        </div>
    );
}
