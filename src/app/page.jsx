import Introduction from "@/compnents/Introduction";
import Testimonials from "@/compnents/Testimonials";
import Services from "@/compnents/Services";
import About from "@/compnents/About";
import FAQ from "@/compnents/FAQ";
import Contact from "@/compnents/Contact";


export default function Home() {
  return (
      <div>
          <Introduction/>
          <Testimonials/>
          <Services/>
          <About/>
          <FAQ/>
          <Contact/>
      </div>

  );
}

