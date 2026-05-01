export type DetailListItem = {
  primary: string;
  secondary?: string;
};

type DetailListProps = {
  items: readonly DetailListItem[];
  className?: string;
};

export function DetailList({ items, className }: DetailListProps) {
  return (
    <ul className={["m-0 list-none space-y-3 p-0", className].filter(Boolean).join(" ")}>
      {items.map(({ primary, secondary }, index) => (
        <li
          key={`${index}-${primary}`}
          className="rounded-2xl border border-white/10 bg-navy-light/30 px-4 py-3"
        >
          <p className="m-0 text-sm font-medium text-fg">{primary}</p>
          {secondary ? <p className="mt-1 m-0 text-sm text-fg-muted">{secondary}</p> : null}
        </li>
      ))}
    </ul>
  );
}
