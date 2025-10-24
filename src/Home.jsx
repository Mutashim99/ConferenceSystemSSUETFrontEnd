import About from "./components/About";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Speakers from "./components/Speakers";

export const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <About/>
      <Speakers/>

    </>
  )
}

export default Home;