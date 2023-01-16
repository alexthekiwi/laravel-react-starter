import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import { PaginatedResults } from '@/types';
import Button from './Button';

type SortOptions = { name: string; value: string }[];
type PerPageOptions = { name: string; value: string }[];

interface Props {
    results: PaginatedResults;
    sortOptions?: SortOptions;
    perPageOptions?: PerPageOptions;
}

const defaultPerPageOptions = [
    {
        name: '10 per page',
        value: '10',
    },
    {
        name: '25 per page',
        value: '25',
    },
    {
        name: '50 per page',
        value: '50',
    },
    {
        name: '100 per page',
        value: '100',
    },
];

export default function Pagination({
    results,
    sortOptions,
    perPageOptions = defaultPerPageOptions,
}: Props) {
    const { data, setData } = useForm({
        limit: '',
        sort: '',
        page: '',
        search: '',
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const search = new URLSearchParams(window.location.search);
            const newData: Partial<typeof data> = {} as const;

            if (search.has('sort')) {
                newData.sort = search.get('sort') as string;
            }

            if (search.has('limit')) {
                newData.limit = search.get('limit') as string;
            }

            if (search.has('page')) {
                newData.page = search.get('page') as string;
            }

            if (search.has('search')) {
                newData.search = search.get('search') as string;
            }

            setData((current) => ({ ...current, ...newData }));
        }
    }, []);

    function handleSortChange(e: React.SyntheticEvent<HTMLSelectElement>) {
        setData('sort', e.currentTarget.value);

        Inertia.get(window.location.pathname, {
            limit: data.limit,
            sort: e.currentTarget.value,
            search: data.search,
        });
    }

    function handleLimitChange(e: React.SyntheticEvent<HTMLSelectElement>) {
        setData('limit', e.currentTarget.value);

        Inertia.get(window.location.pathname, {
            limit: e.currentTarget.value,
            sort: data.sort,
            search: data.search,
        });
    }

    return (
        <div className="flex flex-wrap justify-between">
            <div className="flex gap-6">
                {sortOptions && (
                    <select
                        name="sort"
                        id="sort"
                        onChange={handleSortChange}
                        value={data.sort}
                        className="min-w-[150px]"
                    >
                        {sortOptions.map(({ name, value }) => (
                            <option key={value} value={value}>
                                {name}
                            </option>
                        ))}
                    </select>
                )}

                {perPageOptions && (
                    <select
                        name="limit"
                        id="limit"
                        onChange={handleLimitChange}
                        value={data.limit}
                        className="min-w-[150px]"
                    >
                        {perPageOptions.map(({ name, value }) => (
                            <option key={value} value={value}>
                                {name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <nav className="flex items-center gap-6">
                <p>
                    Page {results.current_page} of {results.last_page}
                </p>
                {results.prev_page_url && (
                    <Button href={results.prev_page_url}>Prev Page</Button>
                )}
                {results.next_page_url && (
                    <Button href={results.next_page_url}>Next Page</Button>
                )}
            </nav>
        </div>
    );
}
