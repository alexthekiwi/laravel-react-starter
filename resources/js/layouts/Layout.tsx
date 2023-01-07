import { PropsWithChildren } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
