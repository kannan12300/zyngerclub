type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionHeader({ eyebrow, title, description, light }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p
        className={`mb-3 inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide ${
          light ? "bg-orange-500/15 text-orange-100" : "bg-red-600 text-white"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl uppercase leading-none md:text-6xl ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mx-auto mt-4 max-w-2xl text-base md:text-lg ${light ? "text-orange-50" : "text-[#f3d6b3]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
