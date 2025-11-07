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
      <About />
      <Speakers />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
