/**
 * TypeScript definitions
 * */

export * from './custom-models';

export interface PaginatedResults<T = any> {
    data: T;
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    prev_page_url: string;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
    from: number;
}
