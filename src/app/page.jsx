import Introduction from "@/components/Introduction";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import KeepAustinWeird from "@/components/KeepAustinWeird";
import SmoothScroller from "@/components/SmoothScroller";
import ErmaBombeck from "@/components/ErmaBombeck";
import EasyLife from "@/components/EasyLife";
import RefTo from "@/components/RefTo";


const Home = () => {

  return (
      <>
          <SmoothScroller/>
          <RefTo id={"home"}>
              <Introduction/>
          </RefTo>
          <Testimonials/>
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
      </>

  );
}
export default Home;

