import { PropsWithChildren } from 'react';
import Toasts from '@/components/common/Toasts';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import UserImpersonationBar from '@/components/common/UserImpersonationBar';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <UserImpersonationBar />
            <Toasts />
        </div>
    );
}
