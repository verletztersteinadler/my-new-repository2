import { factoryFacts, type Manufacturer } from "@/data/manufacturers";

export function FactoryCard({ maker }: { maker: Manufacturer }) {
  const facts = factoryFacts(maker);
  return (
    <section className="mt-6 rounded-3xl border border-line bg-chip p-4">
      <p className="text-xs font-semibold tracking-[0.08em] text-ink uppercase">Завод</p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-muted uppercase">{fact.label}</dt>
            <dd className="mt-1 text-sm leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
