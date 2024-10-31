export const metadata = {
    title: "Privacy Policy | Susy Q Cleaning",
    description: "Susy Q cleaning is a professional company dedicated to be part of your life. Our interest are focused on meeting your needs by offering high quality services and high level satisfaction to our customers. Our green healthy cleaning techniques provide your home with a cleaner healthier environment.",
};

const Page = () => {
    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl bg-stone-100"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8 md:pb-4"}>
                    <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>Privacy Policy</h1>
                    <h4 className={"pt-5 text-center text-xl font-light text-gray-500"}>Last updated: October 1st,
                        2024</h4>
                </div>
                <div className={"flex flex-col max-w-screen-lg gap-6"}>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>What User Data We Collect</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>When you visit the website, we may collect the following data:
                        </p>
                        <ol className={"list-inside pl-10"}>
                            <li className={"list-disc"}>Your IP address.</li>
                            <li className={"list-disc"}>Your contact information and email address.</li>
                            <li className={"list-disc"}>Other information such as interests and preferences.</li>
                            <li className={"list-disc"}>Data profile regarding your online behavior on our website.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Why We Collect Your Data</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>We are collecting your data for several
                            reasons:
                        </p>
                        <ol className={"list-inside pl-10"}>
                            <li className={"list-disc"}>To better understand your needs.</li>
                            <li className={"list-disc"}>To improve our services and products.</li>
                            <li className={"list-disc"}>To send you promotional emails containing the information we think you will find interesting.</li>
                            <li className={"list-disc"}>To contact you to fill out surveys and participate in other types of market research.</li>
                            <li className={"list-disc"}>To customize our website according to your online behavior and personal preferences.</li>
                        </ol>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Our Cookie Policy</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>
                            Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding your online
                            behavior (analyze web traffic, web pages you visit and spend the most time on).
                            The data we collect by using cookies is used to customize our website to your needs. After we use the data for
                            statistical analysis, the data is completely removed from our systems.
                            Please note that cookies don&apos;t allow us to gain control of your computer in any way. They are strictly used to monitor
                            which pages you find useful and which you do not so that we can provide a better experience for you
                            If you want to disable cookies, you can do it by accessing the settings of your internet browser.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Links to Other Websites</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>
                            Our website contains links that lead to other websites. If you click on these links Susy Q Cleaning is not held
                            responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy
                            agreement. Make sure to read the privacy policy documentation of the website you go to from our website.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Restricting the Collection of your Personal Data</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing
                            the following:
                            When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if
                            you don&apos;t want to disclose your personal information.
                            If you have already agreed to share your information with us, feel free to contact us via email and we will be more
                            than happy to change this for you.
                            Susy Q Cleaning will not lease, sell or distribute your personal information to any third parties, unless we have your
                            permission. We might do so if the law forces us. Your personal information will be used when we need to send you
                            promotional materials if you agree to this privacy policy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;