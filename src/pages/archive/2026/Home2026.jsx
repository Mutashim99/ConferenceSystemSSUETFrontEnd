// Import components
import AnimatedSection from "../../../components/AnimatedSection";
import ConferenceTracks from "../../../components/ConferenceTracks";
import AgendaHighlights from "../../../components/AgendaHighlights";
import Contact from "../../../components/Contact";
import Footer from "../../../components/Footer";

// Import 2026 archive-specific components
import Navbar2026 from "../../../components/archive/2026/Navbar2026";
import Header2026 from "../../../components/archive/2026/Header2026";
import About2026 from "../../../components/archive/2026/About2026";
import Speakers2026 from "../../../components/archive/2026/Speakers2026";

export const Home2026 = () => {
  return (
    <>
      <Navbar2026 />
      <Header2026 id="home" />

      <AnimatedSection>
        <section id="about">
          <About2026 />
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

      <section id="speakers">
        <Speakers2026 />
      </section>

      <AnimatedSection>
        <section id="contact">
          <Contact />
        </section>
      </AnimatedSection>

      <Footer />
    </>
  );
};

export default Home2026;
