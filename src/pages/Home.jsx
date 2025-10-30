import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Speakers from "../components/Speakers";

export const Home = () => {
  return (
    <>
      <Header />
      <About />
      <Speakers />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
