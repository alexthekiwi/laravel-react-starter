import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    className?: string;
}

export default function Card({ className = '', children }: Props) {
    const baseClasses =
        'rounded rounded border border-gray-100 bg-white p-4 shadow lg:p-8';

    const classes = `${className} ${baseClasses}`;

    return <div className={classes}>{children}</div>;
}
