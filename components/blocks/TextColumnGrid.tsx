export type TextColumnGridItem = {
  title: string;
  body: string;
};

type TextColumnGridProps = {
  columns: TextColumnGridItem[];
  /** Grid wrapper; default matches the about three-column layout. */
  className?: string;
};

export function TextColumnGrid({ columns, className }: TextColumnGridProps) {
  return (
    <div className={className ?? "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10"}>
      {columns.map((column, index) => (
        <div
          key={column.title}
          className={index === 0 ? "min-w-0" : "min-w-0 lg:border-l lg:border-turquoise/60 lg:pl-8"}
        >
          <h3 className="text-fg">{column.title}</h3>
          <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{column.body}</p>
        </div>
      ))}
    </div>
  );
}
