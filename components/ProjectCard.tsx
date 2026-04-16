type ProjectCardProps = {
    title: string;
    description: string;
    technologies: string;
    details: string;
};

export default function ProjectCard({
    title,
    description,
    technologies,
    details,
}: ProjectCardProps) {
    return (
        <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">{description}</p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium">Tech:</span> {technologies}
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">{details}</p>
        </article>
    );
}