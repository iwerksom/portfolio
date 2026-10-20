import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { PROJECTS } from "@/lib/data";
import { getProjectStatuses } from "@/lib/projectActivity";

// Re-check GitHub pull request activity at most every 5 minutes.
export const revalidate = 300;

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

  const statuses = await getProjectStatuses([project]);

  return <ProjectDetail project={project} status={statuses[project.slug]} />;
}
