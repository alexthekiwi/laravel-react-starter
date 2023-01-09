import { useToast } from '@/lib/toast';
import type { Toast as ToastInterface } from '@/lib/toast';
import Toast from './Toast';

export default function Toasts() {
    const { toasts } = useToast();

    return (
        <div className="fixed bottom-8 right-8 z-[110] flex flex-col gap-6">
            {toasts.map((toast: ToastInterface) => (
                <Toast {...toast} key={toast._id} />
            ))}
        </div>
    );
}
