import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
    return (
        <section>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Check out some of my projects below.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 ">
                <ProjectCard
                    title="Project 1"
                    description="This is a description of project 1."
                    technologies="HTML, CSS, JavaScript"
                    details="Details coming soon"
                />
                <ProjectCard
                    title="Project 2"
                    description="This is a description of project 2."
                    technologies="React, Next.js, Tailwind CSS"
                    details="Details coming soon"
                />
                <ProjectCard
                    title="Project 3"
                    description="This is a description of project 3."
                    technologies="TypeScript, Next.js, Tailwind CSS"
                    details="Details coming soon"
                />
            </div>
        </section>
    );
}