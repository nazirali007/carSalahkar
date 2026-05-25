type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-4xl text-left md:text-center">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 md:mx-auto md:text-lg">
        {description}
      </p>
    </header>
  );
}
