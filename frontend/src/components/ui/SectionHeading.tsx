interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={[
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}