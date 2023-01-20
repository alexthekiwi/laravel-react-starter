import { Link } from '@inertiajs/react';

export interface ButtonProps {
    className?: string;
    theme?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'default';
    href?: string;
    target?: '_blank' | '_self';
    onClick?: Function;
    type?: 'button' | 'submit';
    children: React.ReactNode;
    disabled?: boolean;
    as?: 'link' | 'button' | 'a';
}

export default function Button({
    className,
    href,
    theme = 'default',
    target,
    onClick,
    type,
    children,
    disabled = false,
    as,
}: ButtonProps) {
    const baseClasses =
        'inline-flex items-center gap-3 text-sm justify-center text-center px-5 py-2 rounded transition-all hover:opacity-75';

    const themeClass =
        (theme === 'primary' && 'bg-blue-400 text-white') ||
        (theme === 'success' && 'bg-green-400 text-white') ||
        (theme === 'info' && 'bg-blue-400 text-white') ||
        (theme === 'danger' && 'bg-red-500 text-white') ||
        (theme === 'warning' && 'bg-yellow-400 text-white') ||
        'bg-gray-600 text-white';

    const classes = `${className ?? ''} ${baseClasses} ${themeClass}`;

    if (onClick) {
        return (
            <button
                className={classes}
                type={type ?? 'button'}
                onClick={(e: React.MouseEvent) => onClick(e)}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    if (type) {
        return (
            <button
                className={classes}
                type={type ?? 'button'}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    if (href) {
        if (href.includes('http') || target === '_blank' || as === 'a') {
            return (
                <a href={href} target={target ?? '_self'} className={classes}>
                    {children}
                </a>
            );
        }

        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return <p className="text-sm text-red-500">[Invalid button]</p>;
}
