import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" search={{}} resetScroll={false} aria-label="Котлы.pro" className="inline-flex items-baseline font-display text-lg leading-none font-extrabold tracking-[-0.04em]">
      <span className={light ? "text-white" : "text-ink"}>Котлы</span>
      <span className={light ? "text-[#f0c4cc]" : "text-accent"}>.pro</span>
    </Link>
  );
}