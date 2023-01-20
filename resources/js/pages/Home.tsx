import { Head } from '@inertiajs/react';
import Layout from '@/layouts/Layout';

interface Props {
    //
}

export default function Home({}: Props) {
    return (
        <Layout>
            <Head title="Home" />

            <div className="container mt-12 mb-24">
                <h1 className="mb-12 text-2xl font-bold">Home</h1>
            </div>
        </Layout>
    );
}
