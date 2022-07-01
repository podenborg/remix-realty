import PicoSanity from "picosanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const config = {
  apiVersion: "2021-03-25",
  dataset: "production" /* replace with you dataset name */,
  projectId: "93l2q1u8" /* replace with your projectId */,
  useCdn: process.env.NODE_ENV === "development" ? false : true,
};

export const sanity = new PicoSanity(config);

const builder = imageUrlBuilder(config);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
