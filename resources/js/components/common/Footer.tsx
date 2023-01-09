interface Props {
    //
}

export default function Footer({}: Props) {
    return (
        <footer className="bg-gray-600 py-12 text-white">
            <div className="container">
                <p className="text-xs">
                    &copy; MyApp {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
