"use client"


const NavScrollToButton = ({children, id= ""}) => {
    const handleScroll = () => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: "center"});
        }
    };
    return <button  className={"uppercase py-3.5 px-4 flex flex-col items-center hover:bg-cyan-600 hover:text-white transition duration-150 ease-in-out"} onClick={handleScroll}>{children}</button>;
};

export default NavScrollToButton;