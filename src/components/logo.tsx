import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" search={{}} resetScroll={false} aria-label="kotly.pro" className="inline-flex items-baseline font-display text-lg leading-none font-extrabold tracking-[-0.04em]">
      <span className={light ? "text-white" : "text-ink"}>kotly</span>
      <span className={light ? "text-[#d3123b]" : "text-accent"}>.pro</span>
    </Link>
  );
}