import { Head } from '@inertiajs/react';
import Layout from '@/layouts/Layout';

interface Props {
    //
}

export default function Dashboard({}: Props) {
    return (
        <Layout>
            <Head title="Dashboard" />

            <div className="container mb-24 mt-12">
                <div className="text-gray-900">You're logged in!</div>
            </div>
        </Layout>
    );
}
