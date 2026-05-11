"use client";

import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import {
  FormFieldError,
  formControlClassName,
  formLabelClassName,
} from "@/components/ui/FormField";

/** Matches `--palette-navy-dark` in `app/theme.css` — inline so the portalled panel is never transparent. */
const PANEL_BG = "#0a1828";

export type DarkFormPicklistOption = {
  value: string;
  label: string;
};

type DarkFormPicklistProps = {
  name: string;
  label: ReactNode;
  /** Options in display order. Use `value: ""` for empty state when `placeholder` is set. */
  options: DarkFormPicklistOption[];
  defaultValue: string;
  /** When set, prepends a row with `value: ""` and this label (create flows). */
  placeholder?: string;
  error?: string;
};

type PanelRect = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

const listboxOptionClassName =
  "flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm text-[#fefefe] outline-none hover:bg-white/10 focus-visible:bg-white/10";

const listboxOptionSelectedClassName = "bg-white/12 text-[#4ecdc4]";

export function DarkFormPicklist({
  name,
  label,
  options,
  defaultValue,
  placeholder,
  error,
}: DarkFormPicklistProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);

  const rows: DarkFormPicklistOption[] =
    placeholder !== undefined ? [{ value: "", label: placeholder }, ...options] : options;

  const selectedLabel = rows.find((r) => r.value === value)?.label ?? placeholder ?? "—";

  const close = useCallback(() => {
    setOpen(false);
    setPanelRect(null);
  }, []);

  const updatePanelRect = useCallback(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const gap = 4;
    const top = rect.bottom + gap;
    const maxHeight = Math.max(120, Math.min(288, window.innerHeight - top - 16));
    setPanelRect({
      top,
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePanelRect();
  }, [open, updatePanelRect]);

  useEffect(() => {
    if (!open) return;

    const onScrollResize = () => {
      updatePanelRect();
    };

    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, true);
    return () => {
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize, true);
    };
  }, [open, updatePanelRect]);

  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (triggerRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      close();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onDocPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const listPanel =
    open &&
    panelRect &&
    typeof document !== "undefined" &&
    createPortal(
      <ul
        ref={panelRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        className="m-0 list-none rounded-lg border border-white/20 py-1 shadow-2xl shadow-black/60"
        style={{
          position: "fixed",
          top: panelRect.top,
          left: panelRect.left,
          width: panelRect.width,
          maxHeight: panelRect.maxHeight,
          overflowY: "auto",
          overscrollBehavior: "contain",
          zIndex: 99999,
          backgroundColor: PANEL_BG,
          boxSizing: "border-box",
        }}
      >
        {rows.map((row) => {
          const sel = row.value === value;
          return (
            <li key={`${row.value}-${row.label}`} role="none">
              <button
                role="option"
                type="button"
                aria-selected={sel}
                className={[listboxOptionClassName, sel ? listboxOptionSelectedClassName : ""]
                  .filter(Boolean)
                  .join(" ")}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  setValue(row.value);
                  close();
                }}
              >
                {row.label}
              </button>
            </li>
          );
        })}
      </ul>,
      document.body
    );

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />

      <label className={formLabelClassName} id={`${id}-label`} htmlFor={`${id}-trigger`}>
        {label}
      </label>

      <button
        id={`${id}-trigger`}
        ref={triggerRef}
        type="button"
        className={[
          formControlClassName,
          "flex w-full cursor-pointer items-center justify-between gap-2 text-left",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={`${id}-label`}
        onClick={() => {
          if (open) {
            setOpen(false);
            setPanelRect(null);
            return;
          }
          setOpen(true);
        }}
      >
        <span className={value === "" && placeholder ? "text-fg-muted/65" : ""}>
          {selectedLabel}
        </span>
        <ChevronDown
          className={[
            "size-4 shrink-0 text-fg-muted transition-transform",
            open ? "rotate-180" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        />
      </button>

      {listPanel}

      <FormFieldError message={error} />
    </div>
  );
}
