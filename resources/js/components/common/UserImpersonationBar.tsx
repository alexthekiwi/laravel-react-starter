import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { useSubmit } from '@/lib/forms';

export default function UserImpersonationBar() {
    const { user_proxy_id: userProxyId } = usePage().props;

    const onCancel = useSubmit({
        message: 'Impersonation cancelled.',
    });

    function handleCancelUserProxy() {
        Inertia.delete('/user-proxy', onCancel);
    }

    if (!userProxyId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 w-full bg-blue-500 text-white">
            <div className="container py-3 text-center">
                You are currently impersonating another user.{' '}
                <button onClick={handleCancelUserProxy} className="underline">
                    Stop Impersonation
                </button>
            </div>
        </div>
    );
}
