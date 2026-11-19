import { cn } from "@/lib/utils";

export function SheetHandle({ className = "md:hidden" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto mb-3 h-1.5 w-10 shrink-0 rounded-full bg-line", className)}
    />
  );
}
