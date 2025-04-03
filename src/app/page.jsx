import IntroductionSection from "@/components/IntroductionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FAQ_Section from "@/components/FAQ_Section";
import ContactSection from "@/components/ContactSection";
import KeepAustinWeird from "@/components/KeepAustinWeird";
import ErmaBombeck from "@/components/ErmaBombeck";
import EasyLife from "@/components/EasyLife";
import RefTo from "@/components/RefTo";
import SmoothScroller from "@/components/SmoothScroller";
import ReviewBanner from "@/components/ReviewBanner";

export const metadata = {
    title: "Green Cleaning Services - Susy Q Cleaning",
    description: "Green house cleaning by Susy Q in Austin & Round Rock. Book a healthier home today!",
    alternates: {
        canonical: "https://susyqcleaning.com",
    },
    openGraph: {
        title: "Green Cleaning Services - Susy Q Cleaning",
        description: "Green house cleaning by Susy Q in Austin & Round Rock. Book a healthier home today!",
        images: [{ url: "/opengraph-image.png", width: 800, height: 599, alt: "susy q cleaning" }],
    },
    twitter: {
        title: "Green Cleaning Services - Susy Q Cleaning",
        description: "Green house cleaning by Susy Q in Austin & Round Rock. Book a healthier home today!",
        images: ["/opengraph-image.png"],
    },
};


const Home = () => {

  return (
      <>
          <SmoothScroller>
              <RefTo id={"home"}>
                  <IntroductionSection/>
              </RefTo>
              <TestimonialsSection/>
              <ReviewBanner/>
              <RefTo id={"services"}>
                  <ServicesSection/>
              </RefTo>
              <KeepAustinWeird/>
              <RefTo id={"about"}>
                  <AboutSection/>
              </RefTo>
              <ErmaBombeck/>
              <RefTo id={"faq"}>
                  <FAQ_Section/>
              </RefTo>
              <EasyLife/>
              <RefTo id={"contact"}>
                  <ContactSection/>
              </RefTo>
          </SmoothScroller>
      </>

  );
}
export default Home;

