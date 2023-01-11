interface Props {
    className?: string;
}

export default function Loader({ className = '' }: Props) {
    return <div className={`${className} loader`} />;
}
