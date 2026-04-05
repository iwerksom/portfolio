import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AIFocus from "@/components/AIFocus";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Posts from "@/components/Posts";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AIFocus />
      <Projects />
      <Posts />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
