import { useEffect } from "react";

import { SITE_URL } from "@/data/site";
import { fullTitle, ogImage } from "@/data/pages";

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

export function useSeo(
  meta: { title?: string; description: string; path?: string; noindex?: boolean } | undefined,
) {
  const { title, description, path, noindex } = meta ?? {};
  useEffect(() => {
    if (description === undefined) return;
    const t = fullTitle(title);
    document.title = t;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", t);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="robots"]', "content", noindex ? "noindex" : "index, follow");
    if (path !== undefined) {
      setMeta('link[rel="canonical"]', "href", SITE_URL + path);
      setMeta('meta[property="og:url"]', "content", SITE_URL + path);
      setMeta('meta[property="og:image"]', "content", SITE_URL + ogImage(path));
    }
  }, [title, description, path, noindex]);
}
