import Aurora from "@/components/Aurora";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Aurora />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
