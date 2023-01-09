import React from 'react';
import { ToastProvider } from '@/lib/toast';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ToastProvider>{children}</ToastProvider>;
}
