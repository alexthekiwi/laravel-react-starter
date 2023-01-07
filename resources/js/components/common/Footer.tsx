interface Props {
    //
}

export default function Footer({}: Props) {
    return (
        <footer className="bg-gray-600 text-white py-12">
            <div className="container">
                <p className="text-xs">
                    &copy; MyApp {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
}
