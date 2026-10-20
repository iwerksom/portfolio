import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AIFocus from "@/components/AIFocus";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Posts from "@/components/Posts";
import GithubFeed from "@/components/GithubFeed";
import { getProjectStatuses } from "@/lib/projectActivity";

// Re-check GitHub pull request activity at most every 5 minutes.
export const revalidate = 300;

export default async function Home() {
  const statuses = await getProjectStatuses();

  return (
    <main>
      <Nav />
      <Hero />
      <AIFocus />
      <Projects statuses={statuses} />
      <Posts />
      <GithubFeed />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
