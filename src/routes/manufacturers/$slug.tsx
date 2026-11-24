import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy manufacturer addresses must never compete in the index with /<slug>. */
export const Route = createFileRoute("/manufacturers/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/$slug", params: { slug: params.slug }, replace: true });
  },
});
