import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 px-6", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
          {label}
        </p>
      )}
      <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
