import PicoSanity from "picosanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const config = {
  apiVersion: "2021-03-25",
  dataset: "production",
  projectId: "93l2q1u8",
  useCdn: false,
};

export const sanity = new PicoSanity(config);

const builder = imageUrlBuilder(config);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
