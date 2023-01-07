import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { handleChange } from '@/lib/forms';

interface Props {
    className?: string;
}

export default function DeleteUserForm({ className = '' }: Props) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    function confirmUserDeletion() {
        setConfirmingUserDeletion(true);
    }

    function deleteUser(e: React.FormEvent) {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    }

    function closeModal() {
        setConfirmingUserDeletion(false);

        reset();
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Delete Account
                </h2>
                <p className="text-sm">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button theme="danger" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser}>
                    <p className="mb-6">
                        Please enter your password to confirm you would like to
                        permanently delete your account.
                    </p>

                    <label>
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
                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </label>

                    <div className="mt-6 flex justify-end">
                        <Button type="button" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="ml-3"
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
