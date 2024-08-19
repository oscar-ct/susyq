"use client"

import { motion } from "framer-motion";
import TestimonialsCard from "@/components/TestimonialsCard";


const TestimonialsMobile = ({ author, quote, hueA, hueB }) => {

    const cardVariants = {
        offscreen: {
            y: 200
        },
        onscreen: {
            y: 0,
            rotate: 3,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    // const hue = (h) => `hsl(${h}, 100%, 50%)`;
    // const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <motion.div
            className="h-[320px] overflow-hidden flex items-center justify-center relative pt-[50px] mb-[-90px]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
        >
            <div className="splash bg-cyan-500"/>
            <motion.div variants={cardVariants}>
                <TestimonialsCard author={author}>
                    {quote}
                </TestimonialsCard>
            </motion.div>
        </motion.div>
    );
}

export default TestimonialsMobile;


