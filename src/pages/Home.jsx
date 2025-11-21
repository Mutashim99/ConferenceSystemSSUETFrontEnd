// Import the new components
import AnimatedSection from "../components/AnimatedSection";
import ConferenceTracks from "../components/ConferenceTracks";
import AgendaHighlights from "../components/AgendaHighlights";
import Sponsors from "../components/Sponsors";

// Import existing components
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Speakers from "../components/Speakers";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header id="home" />

      <AnimatedSection>
        <section id="about">
          <About />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="tracks">
          <ConferenceTracks />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="agenda">
          <AgendaHighlights />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="speakers">
          <Speakers />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="sponsors">
          <Sponsors />
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="contact">
          <Contact />
        </section>
      </AnimatedSection>

      <Footer />
    </>
  );
};

export default Home;