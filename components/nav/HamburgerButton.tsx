"use client";

type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
  menuId: string;
};

export function HamburgerButton({ open, onToggle, menuId }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-fg transition-colors hover:text-turquoise focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise md:hidden"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Stäng menyn" : "Öppna menyn"}</span>
      {!open ? (
        <svg className="h-7 w-7 fill-current" viewBox="0 0 512 512" aria-hidden="true">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      ) : (
        <svg className="h-7 w-7 fill-current" viewBox="0 0 512 512" aria-hidden="true">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      )}
    </button>
  );
}
