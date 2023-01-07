import { Head } from '@inertiajs/inertia-react';
import Layout from '@/layouts/Layout';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container py-12">
                <div className="text-gray-900">You're logged in!</div>
            </div>
        </Layout>
    );
}
