import React from 'react';
import { router, useForm } from '@inertiajs/react';
import { handleChange } from '@/lib/forms';

interface Props {
    path: string;
    minLength?: number;
    placeholder?: string;
    showClearSearch?: boolean;
}

export default function SearchBar({
    path,
    minLength = 3,
    placeholder = 'Enter your search term',
    showClearSearch = true,
}: Props) {
    const { data, setData } = useForm({
        search: '',
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const search = new URLSearchParams(window.location.search).get(
                'search'
            );

            if (search) {
                setData('search', search);
            }
        }
    }, []);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (data.search.length < minLength && data.search.length > 0) {
            return;
        }

        router.get(path, { search: data.search });
    }

    function clearSearch() {
        router.get(path);
    }

    return (
        <div className="flex items-stretch gap-6">
            <form
                className="relative flex flex-grow items-center"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder={placeholder}
                    className="h-[50px] w-full"
                    value={data.search}
                    onChange={(event) => handleChange({ event, data, setData })}
                />
                <button
                    type="submit"
                    className="hover:text-magenta absolute right-3 transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </form>
            {showClearSearch && (
                <button
                    title="Clear Search"
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-gray-200"
                    onClick={clearSearch}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
