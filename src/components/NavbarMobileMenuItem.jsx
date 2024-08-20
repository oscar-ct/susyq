import { motion } from "framer-motion";


const NavbarMobileMenuItem = ({ children }) => {
    const variants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    // const handleScroll = () => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth', block: "center"});
    //     }
    //     toggle();
    // };

    return (
        <motion.li
            className={`mb-8 w-full cursor-pointer text-white`}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}

        </motion.li>
    );
};

export default NavbarMobileMenuItem;