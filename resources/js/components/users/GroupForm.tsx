import { useForm } from '@inertiajs/react';
import React from 'react';
import { upperFirst } from 'lodash';
import { handleChange, useSubmit } from '@/lib/forms';
import Button from '../common/Button';
import { useAuth } from '@/lib/auth';
import { Role } from '@/types';

interface Props {
    group?: App.Models.Group;
    roles?: Role[];
}

export default function GroupForm({ group, roles }: Props) {
    const { can, currentGroup } = useAuth();

    const isAdmin = can('admin');

    const { data, setData, post, put, errors } = useForm({
        name: group?.name || '',
        role_id: group?.role_id || undefined,
        owner_ids: group?.owners?.map((u) => u.id) || [],
    });

    const onSubmit = useSubmit({ message: 'Group saved!' });

    function handleOwnerToggle(e: React.SyntheticEvent<HTMLInputElement>) {
        if (e.currentTarget.checked) {
            setData('owner_ids', [
                ...data.owner_ids,
                parseInt(e.currentTarget.value),
            ]);
        } else {
            setData(
                'owner_ids',
                data.owner_ids.filter(
                    (id) => id !== parseInt(e.currentTarget.value)
                )
            );
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (group) {
            put(`/groups/${group.id}`, onSubmit);
            return;
        }

        post(`/groups`, onSubmit);
    }

    const isGroupOwner =
        currentGroup?.id === group?.id && currentGroup?.is_owner;

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

                    {isAdmin && (
                        <label>
                            Role
                            <select
                                name="role_id"
                                id="role_id"
                                value={data.role_id}
                                onChange={(event) =>
                                    handleChange({ event, data, setData })
                                }
                            >
                                <option value="">Select role</option>
                                {roles?.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {upperFirst(role.name)}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    {group && (isAdmin || isGroupOwner) && (
                        <div>
                            <p className="col-span-full mb-4 text-sm">
                                Group owners
                            </p>
                            <div className="grid gap-6 text-xs md:grid-cols-3">
                                {group.users?.map((user) => (
                                    <label key={user.id} className="checkbox">
                                        <input
                                            type="checkbox"
                                            name="owner_ids"
                                            id={`owners_${user.id}`}
                                            value={user.id}
                                            checked={data.owner_ids.includes(
                                                user.id
                                            )}
                                            onChange={handleOwnerToggle}
                                        />
                                        <span>{user.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </fieldset>
                <div className="flex justify-end gap-6">
                    <Button type="submit">Save group</Button>
                </div>
            </form>
        </div>
    );
}
