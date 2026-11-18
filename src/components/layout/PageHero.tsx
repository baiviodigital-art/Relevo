import { SplitWords } from "@/components/motion/SplitWords";
import { SceneArt } from "@/components/ui/SceneArt";
import { ImageReveal } from "@/components/motion/ImageReveal";

type SceneName = Parameters<typeof SceneArt>[0]["scene"];

/** Cabecera editorial para páginas interiores. */
export function PageHero({
  eyebrow,
  lines,
  intro,
  scene,
  sceneAlt = "",
  tone = "ink",
}: {
  eyebrow: string;
  lines: string[];
  intro?: React.ReactNode;
  scene?: SceneName;
  sceneAlt?: string;
  tone?: "ink" | "paper";
}) {
  const dark = tone === "ink";
  return (
    <section className={`${dark ? "bg-ink text-paper" : "bg-paper text-ink"} relative overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-24`}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className={scene ? "lg:col-span-8" : "lg:col-span-12"}>
          <p className={`eyebrow flex items-center gap-3 ${dark ? "text-stone-2" : "text-ink/70"}`}>
            <span className="inline-block h-2 w-2 bg-scarlet" aria-hidden />
            {eyebrow}
          </p>
          <SplitWords as="h1" trigger="load" delay={0.35} lines={lines} className="display mt-6 text-[15vw] sm:text-[11vw] lg:text-[8vw]" />
          {intro && <div className={`mt-8 max-w-2xl text-lg leading-relaxed md:text-xl ${dark ? "text-paper/80" : "text-ink/80"}`}>{intro}</div>}
        </div>
        {scene && (
          <ImageReveal onLoad direction="up" className="relative aspect-[4/5] lg:col-span-4">
            <SceneArt scene={scene} alt={sceneAlt} priority className="h-full w-full" />
          </ImageReveal>
        )}
      </div>
    </section>
  );
}
