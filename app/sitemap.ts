import type { MetadataRoute } from "next";
import { SITE_URL, servicePages } from "@/lib/services";
import { projects } from "@/lib/work";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work/",
    "/about/",
    ...servicePages.map((s) => `/services/${s.slug}/`),
    ...projects.map((p) => `/work/${p.slug}/`),
    "/privacy/",
    "/terms/",
    "/guarantee/",
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
