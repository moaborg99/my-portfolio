"use client";

import { Check, ChevronDown, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
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

const PANEL_BG = "#0a1828";

export type DarkFormMultiPicklistOption = {
  value: string;
  label: string;

  group?: string;
};

type DarkFormMultiPicklistProps = {
  name: string;
  label: ReactNode;

  options: DarkFormMultiPicklistOption[];

  defaultValues: string[];
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
  "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#fefefe] outline-none hover:bg-white/10 focus-visible:bg-white/10";

const listboxOptionSelectedClassName =
  "bg-white/12 text-[#4ecdc4] hover:bg-white/15 focus-visible:bg-white/15";

const groupHeadingClassName =
  "px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-fg-muted/70";

const chipClassName =
  "inline-flex max-w-full items-center gap-2.5 rounded-full border border-turquoise/35 bg-turquoise/12 px-4 py-1 text-xs leading-none text-fg";

const chipRemoveClassName =
  "inline-flex size-[1.125rem] shrink-0 items-center justify-center rounded-full text-fg-muted/80 transition-colors hover:bg-white/15 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/30";

export function DarkFormMultiPicklist({
  name,
  label,
  options,
  defaultValues,
  placeholder,
  error,
}: DarkFormMultiPicklistProps) {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const v of defaultValues) {
      if (!seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
    return out;
  });
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);

  const labelByValue = useMemo(() => {
    const m = new Map<string, string>();
    for (const o of options) m.set(o.value, o.label);
    return m;
  }, [options]);

  const grouped = useMemo(() => {
    const hasGroups = options.some((o) => typeof o.group === "string" && o.group !== "");
    if (!hasGroups) {
      return [{ group: "", items: options }];
    }
    const order: string[] = [];
    const buckets = new Map<string, DarkFormMultiPicklistOption[]>();
    for (const o of options) {
      const g = o.group ?? "";
      if (!buckets.has(g)) {
        buckets.set(g, []);
        order.push(g);
      }
      buckets.get(g)!.push(o);
    }
    return order.map((g) => ({ group: g, items: buckets.get(g)! }));
  }, [options]);

  const close = useCallback(() => {
    setOpen(false);
    setPanelRect(null);
  }, []);

  const toggleValue = useCallback((value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }, []);

  const removeValue = useCallback((value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value));
  }, []);

  const updatePanelRect = useCallback(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const gap = 4;
    const top = rect.bottom + gap;
    const maxHeight = Math.max(160, Math.min(360, window.innerHeight - top - 16));
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
        aria-multiselectable="true"
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
        {grouped.map((bucket, gi) => (
          <li key={`group-${gi}-${bucket.group}`} role="none">
            {bucket.group !== "" ? (
              <div className={groupHeadingClassName} role="presentation">
                {bucket.group}
              </div>
            ) : null}
            <ul className="m-0 list-none p-0">
              {bucket.items.map((row) => {
                const sel = selected.includes(row.value);
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
                        toggleValue(row.value);
                      }}
                    >
                      <span
                        aria-hidden
                        className={[
                          "inline-flex size-4 shrink-0 items-center justify-center rounded border",
                          sel
                            ? "border-turquoise/60 bg-turquoise/20 text-turquoise"
                            : "border-white/25 bg-transparent",
                        ].join(" ")}
                      >
                        {sel ? <Check className="size-3" aria-hidden /> : null}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{row.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>,
      document.body
    );

  const placeholderText = placeholder ?? "Välj…";

  return (
    <div className="relative">
      {selected.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <label className={formLabelClassName} id={`${id}-label`} htmlFor={`${id}-trigger`}>
        {label}
      </label>

      <button
        id={`${id}-trigger`}
        ref={triggerRef}
        type="button"
        className={[
          formControlClassName,
          "flex w-full min-h-[2.5rem] cursor-pointer items-center justify-between gap-2 text-left",
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
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {selected.length === 0 ? (
            <span className="text-fg-muted/65">{placeholderText}</span>
          ) : (
            selected.map((v) => (
              <span key={v} className={chipClassName}>
                <span className="truncate">{labelByValue.get(v) ?? v}</span>
                <span
                  role="button"
                  tabIndex={0}
                  aria-label={`Ta bort ${labelByValue.get(v) ?? v}`}
                  className={chipRemoveClassName}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(v);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      removeValue(v);
                    }
                  }}
                >
                  <X className="size-3" aria-hidden />
                </span>
              </span>
            ))
          )}
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
