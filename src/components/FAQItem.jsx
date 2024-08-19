
const FaqItem = ({ question, answer }) => {
    return (
        <div className={"flex flex-col w-full md:w-6/12 py-3"}>
            <p className={"text-bold text-center md:text-start px-2"}>{question}</p>
            <p className={"pt-3 font-light text-gray-500 text-center md:text-start px-2"}>{answer}</p>
        </div>
    );
};

export default FaqItem;