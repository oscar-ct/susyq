import Link from "next/link";
import {FaExclamationTriangle} from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className="bg-gray-50 flex items-center justify-center px-4 min-h-[calc(100vh-388px)] md:min-h-[calc(100vh-256px)]">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="flex justify-center">
                    <FaExclamationTriangle className="text-6xl text-yellow-500 animate-bounce"/>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    404 - Page Not Found
                </h1>
                <p className="text-lg text-gray-500">
                    Oops! It looks like we took a wrong turn. The page you’re looking for doesn’t exist or has been
                    moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2.5 bg-susy text-white font-medium text-sm uppercase tracking-wide rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none transition-all duration-200 ease-in-out"
                >
                    Back to Home
                </Link>

            </div>
        </div>
    );
};

export default NotFoundPage;