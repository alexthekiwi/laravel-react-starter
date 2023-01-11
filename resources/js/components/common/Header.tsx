import { Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import { useAuth } from '@/lib/auth';
import Dropdown from '@/components/common/Dropdown';
import NavLink from './NavLink';

interface Props {
    //
}

export default function Header({}: Props) {
    const { user, currentGroup, can } = useAuth();

    const isAdmin = can('admin');

    return (
        <header className="flex min-h-[80px] items-center bg-gray-600 text-white">
            <div className="container flex items-center justify-between py-4">
                <Link href="/">MyApp</Link>
                <nav className="flex items-center gap-6 text-sm">
                    <NavLink href="/">Home</NavLink>
                    {user && <NavLink href="/dashboard">Dashboard</NavLink>}
                    {user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex min-w-[120px] items-center justify-between rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                {currentGroup && (
                                    <Dropdown.Link
                                        href={route('groups.show', {
                                            group: currentGroup.id,
                                        })}
                                    >
                                        {currentGroup.name}
                                    </Dropdown.Link>
                                )}
                                <Dropdown.Link
                                    href={route('group-switch.index')}
                                >
                                    Switch Group
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                                {isAdmin && (
                                    <>
                                        <hr className="my-2" />
                                        <Dropdown.Link href="/users">
                                            All Users
                                        </Dropdown.Link>
                                        <Dropdown.Link href="/groups">
                                            All Groups
                                        </Dropdown.Link>
                                    </>
                                )}
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                            <hr />
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
