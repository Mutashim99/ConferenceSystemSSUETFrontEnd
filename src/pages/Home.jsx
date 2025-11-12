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
      <Header />
      
      {/* Each main section is now wrapped for animation */}
      <AnimatedSection>
        <About />
      </AnimatedSection>
      
      <AnimatedSection>
        <ConferenceTracks />
      </AnimatedSection>
      
      <AnimatedSection>
        <AgendaHighlights />
      </AnimatedSection>
      
      <AnimatedSection>
        <Speakers />
      </AnimatedSection>
      
      <AnimatedSection>
        <Sponsors />
      </AnimatedSection>
      
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
      
      <Footer />
    </>
  );
};

export default Home;