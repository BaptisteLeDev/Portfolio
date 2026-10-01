import { useEffect } from "react";

import { SITE_URL } from "@/data/site";
export const HOME_DESCRIPTION =
  "Baptiste Dechamp, développeur web full-stack (React, TypeScript, Node). Portfolio : projets web, mobile et design, stack technique, CV et contact.";
const SITE_NAME = "Baptiste Dechamp, Développeur";

function setMeta(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

export function useSeo({
  title,
  description,
  path,
  noindex,
}: {
  title?: string;
  description: string;
  path?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Portfolio`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="robots"]', "content", noindex ? "noindex" : "index, follow");
    if (path !== undefined) {
      setMeta('link[rel="canonical"]', "href", SITE_URL + path);
      setMeta('meta[property="og:url"]', "content", SITE_URL + path);
    }
  }, [title, description, path, noindex]);
}
