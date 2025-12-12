import { MetaOptions } from "@seye-bamidele/shared-types";
import type { Metadata } from "next";


const APP_NAME = "Seye Bandele";
const APP_DEFAULT_DESCRIPTION = "Seye Bandele personal website.";
const APP_BASE_URL = "https://seyebandele.com";

export function createMetadata({
  title,
  description = APP_DEFAULT_DESCRIPTION,
  keywords = [],
  image = 'https://rdhymzuvqukzziqbcunt.supabase.co/storage/v1/object/public/web%20images/seye-portriat-revamp.png',
  url = APP_BASE_URL,
}: MetaOptions = {}): Metadata {
  return {
    title: title ? `${title} | ${APP_NAME}` : APP_NAME,
    description,
    keywords,

    openGraph: {
      title: title ? `${title} | ${APP_NAME}` : APP_NAME,
      description,
      url,
      siteName: APP_NAME,
      images: [{ url: image }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${APP_NAME}` : APP_NAME,
      description,
      images: [image],
    },

    alternates: {
      canonical: url,
    },
  };
}
