type BulletListProps = {
  items: readonly string[];
  className?: string;
};

export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul
      className={[
        "m-0 max-w-none list-none space-y-2.5 p-0 leading-relaxed text-fg-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex gap-2.5">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-turquoise/80" aria-hidden />
          <span className="max-w-none">{item}</span>
        </li>
      ))}
    </ul>
  );
}
