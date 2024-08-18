import { motion } from "framer-motion";

const NavbarMobileMenuItem = ({ children, textColorClass = "text-white"}) => {
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
    // const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
    //
    // const style = { border: `2px solid ${colors[i]}` };

    return (
        <motion.li
            className={`pb-8 flex items-center cursor-pointer ${textColorClass}`}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            {/*<div className="w-10 h-10 rounded-full flex mr-5" style={style} />*/}
            {/*<div className="rounded-md w-40 h-5" style={style} />*/}

        </motion.li>
    );
};

export default NavbarMobileMenuItem;