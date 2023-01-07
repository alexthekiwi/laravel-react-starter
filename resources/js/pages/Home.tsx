import Layout from '@/layouts/Layout';

interface Props {
    //
}

export default function Home({}: Props) {
    return (
        <Layout>
            <div className="container py-6">
                <h1>Home</h1>
            </div>
        </Layout>
    );
}
