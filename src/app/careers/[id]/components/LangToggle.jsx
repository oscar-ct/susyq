"use client";

import {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";

const LangToggle = ({ lang = 'en' }) => {

    const [isChecked, setIsChecked] = useState(lang === 'es');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsChecked(lang === 'es');
    }, [lang]);

    const handleCheckboxChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        const basePath = pathname.split('?')[0];
        const newUrl = newChecked ? `${basePath}?lang=es` : basePath;
        router.push(newUrl, { scroll: false });
    };
    return (
        <div className={"flex flex-col items-center justify-center gap-2"}>
            <label htmlFor={"lang"} className="flex cursor-pointer select-none items-center">
                <div className="relative">
                    <input
                        id={"lang"}
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="sr-only"
                    />
                    <div className={`h-5 w-14 rounded-full shadow-inner transition-colors duration-200 ease-in-out ${
                        isChecked ? 'bg-susy' : 'bg-gray-600'
                    }`}
                    ></div>
                    <div
                        className={`absolute -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                            isChecked ? 'translate-x-9' : 'translate-x-0'
                        }`}
                    >
                        <span className={`h-4 w-4 rounded-full border transition-colors duration-200 ease-in-out ${
                            isChecked ? 'bg-cyan-700 border-white' : 'bg-white border-gray-600'
                        }`}/>
                    </div>
                </div>
            </label>
            <div className={"text-gray-500 text-sm font-light"}> {isChecked ? 'Cambiar a Inglés' : 'Cambiar a Español'}</div>
        </div>
    );
};

export default LangToggle;