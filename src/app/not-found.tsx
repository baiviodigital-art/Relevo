import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] flex-col justify-center bg-ink pt-[var(--nav-h)]">
      <div className="container-x">
        <p className="display text-[40vw] leading-[0.8] text-stone lg:text-[22vw]">404</p>
        <h1 className="display mt-6 text-5xl text-paper md:text-7xl">
          Esta página <span className="text-scarlet">no existe.</span>
        </h1>
        <div className="mt-10">
          <Button href="/">Volver al inicio</Button>
        </div>
      </div>
    </section>
  );
}
