import FAQItem from "@/components/FAQItem";

const FAQ_Section = () => {

    const FAQ = [
        ["Who provides the cleaning supplies?", "We come prepared with green cleaning supplies. However we are flexible and can use your house cleaning products if you wish."],
        ["Do I need to be home?", "For the first time we request that you be home. After you may leave key copies with your door man, super, friend, neighbor, or us."],
        ["What should I do before a home cleaning service?", "To make our house cleaning services more efficient, we ask that you pick up clothing, toys and other household items prior a visit from our housekeeping teams."],
        ["What happens if I need to reschedule my maid service?", "Call 24-hours before your regularly scheduled home cleaning with a more convenient cleaning time. We will do our best to accommodate your scheduling needs."],
        ["How do I pay for residential cleaning services?", "Payments are due the day of your scheduled cleaning service. Most customers find it convenient to simply leave cash or a check."],
        ["How many people will be cleaning my house?", "1 or more"],
        ["What should I do if my something is broken by a house cleaner?", "Call us immediately"],
        ["What if I have pets? Do I have to secure them during cleaning?", "Most of our workers are dog and cat friendly, however, please inform us if you have pet(s) prior to our arrival. Tigers, lions and bears, oh my, and other aggressive domestic animals must be locked away for everyone safety."],
        ["Will I need to sign a contract?", "No."],

    ]

    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center"}>
                    <span className={"text-center text-5xl uppercase font-light text-gray-500"}>Frequently asked questions</span>
                   <div className={"pt-8 flex flex-col md:flex-row flex-wrap"}>
                       {
                           FAQ.map(([question, answer], index) => {
                               return (
                                   <FAQItem key={index} question={question} answer={answer}/>
                               )
                           })
                       }

                   </div>
                </div>

            </div>
        </section>
    );
};

export default FAQ_Section;