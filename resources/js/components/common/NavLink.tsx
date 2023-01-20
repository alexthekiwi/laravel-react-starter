import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    href: string;
}

export default function NavLink({ href, children }: Props) {
    const [isCurrent, setCurrent] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const { pathname } = window.location;
            setCurrent(pathname === href);
        }
    }, [href]);

    return (
        <Link
            className={`${
                isCurrent ? 'underline' : ''
            } transition-all hover:underline`}
            href={href}
        >
            {children}
        </Link>
    );
}
