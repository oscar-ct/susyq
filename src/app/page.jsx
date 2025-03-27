import Introduction from "@/components/Introduction";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
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
                  <Introduction/>
              </RefTo>
              <Testimonials/>
              <ReviewBanner/>
              <RefTo id={"services"}>
                  <Services/>
              </RefTo>
              <KeepAustinWeird/>
              <RefTo id={"about"}>
                  <About/>
              </RefTo>
              <ErmaBombeck/>
              <RefTo id={"faq"}>
                  <FAQ/>
              </RefTo>
              <EasyLife/>
              <RefTo id={"contact"}>
                  <Contact/>
              </RefTo>
          </SmoothScroller>
      </>

  );
}
export default Home;

