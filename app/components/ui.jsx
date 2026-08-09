// ---------- мелкие переиспользуемые кусочки ----------

export function Placeholder({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-bg p-2.5 text-center font-brand text-[11px] font-medium text-brand-ink/40">
      {children}
    </div>
  );
}

export function Badge({ children }) {
  return (
    <span className="inline-block rounded-full bg-brand-lime px-2.5 py-1 font-brand text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-ink">
      {children}
    </span>
  );
}

export function Button({ children, variant = "primary", size = "lg", className = "", ...props }) {
  const base =
    "font-brand font-bold rounded-full cursor-pointer transition-colors duration-150 inline-flex items-center justify-center";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
    secondary:
      "bg-transparent text-brand-blue border-[1.5px] border-brand-blue hover:bg-brand-bg",
  };
  const sizes = {
    sm: "px-4.5 py-2.5 text-xs",
    md: "px-5.5 py-3.5 text-[13px]",
    lg: "px-6.5 py-4.5 text-sm",
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SectionEyebrow({ children }) {
  return (
    <span className="font-brand text-[10.5px] font-bold tracking-[0.16em] text-brand-teal">
      {children}
    </span>
  );
}
