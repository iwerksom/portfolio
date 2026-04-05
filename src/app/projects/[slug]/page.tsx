import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jonas Schoustrup-Thomsen`,
    description: project.teaser,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
