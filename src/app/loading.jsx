export const metadata = {
    title: "e-shop | Loading...",
};

const Loading = () => {
    return (
        <div className={"z-30 w-full mx-auto min-h-[calc(100vh-292px)] md:min-h-[calc(100vh-224px)] flex items-center justify-center"}>
            <span className="loading loading-bars loading-lg"/>
        </div>
    );
};

export default Loading;