import React from 'react';
import { Transition } from '@headlessui/react';
import type { Toast as ToastInterface } from '@/lib/toast';
import { useToast } from '../../lib/toast';

export default function Toast({
    _id = '',
    message,
    status = 'default',
}: ToastInterface) {
    const { removeToast } = useToast();

    const defaultClasses =
        'w-full min-w-[250px] p-4 shadow flex gap-4 justify-between items-center rounded-md text-sm font-bold';

    const statusClasses =
        (status === 'success' && 'bg-green-400 text-white') ||
        (status === 'error' && 'bg-red-500 text-white') ||
        (status === 'warning' && 'bg-yellow-400 text-white') ||
        'bg-white text-gray-600';

    const classes = `${defaultClasses} ${statusClasses}`;

    function handleClick() {
        removeToast(_id);
    }

    return (
        <Transition
            show
            appear
            enter="transition-all duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
        >
            <div className={classes}>
                <p>{message}</p>
                <button
                    className=""
                    onClick={handleClick}
                    title="Close message"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </Transition>
    );
}
