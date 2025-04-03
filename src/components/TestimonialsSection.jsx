import TestimonialsCard from "@/components/TestimonialsCard";
import TestimonialsMobile from "@/components/TestimonialsMobile";

const TestimonialsSection = () => {

    const testimonials = [
        ["— Cynthia O.", "Suzy Q has been cleaning my home for a year now and they are fantastic, organized, on time and do a great job.", 200, 175],
        ["— Maria K.", "Had a wonderful experience with Susy Q Cleaning.", 185, 200],
        ["— James H.", "Punctual, professional, and green! Susy Q Cleaning does a fantastic job...", 200, 175],
        ["— Phillip J.", "The crew is very professional. The owner very nice. Overall my house was left impeccable.",185, 200],
    ];

    return (
        <section className={"pb-28 sm:pb-20 pt-14 w-full mx-auto px-4 lg:px-8 bg-zinc-100"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex justify-center sm:pb-14"}>
                    <span className={"text-center text-5xl uppercase font-light text-gray-500"}>Susy Q is helping everyone.</span>
                </div>
                <div className={"hidden w-full sm:flex sm:justify-center sm:flex-wrap gap-8"}>
                    {
                        testimonials.map(([author, quote], index) => {
                            return (
                                <TestimonialsCard author={author} key={index}>
                                    {quote}
                                </TestimonialsCard>
                            )
                        })
                    }
                </div>
                <div className={"sm:hidden w-full"}>
                    {
                        testimonials.map(([author, quote, hueA, hueB], index) => {
                            return (
                                <TestimonialsMobile author={author} quote={quote} hueA={hueA} hueB={hueB} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;