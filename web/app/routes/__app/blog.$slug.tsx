import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { sanity, urlFor } from "~/services/sanity";
import type { BlogPost as IBlogPost } from "~/types";
import { PortableText } from "@portabletext/react";

import CallToActionImage from "../../assets/jacques-bopp-Hh18POSx5qk-unsplash.jpeg";

interface LoaderData {
  post: IBlogPost;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const post = await sanity.fetch(
    `*[_type == "blogPost" && slug.current == $slug]{
    body,
    title,
    coverImage,
    ...
  }[0]`,
    { slug }
  );

  if (!post) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>({ post });
};

export default function BlogPost() {
  const { post } = useLoaderData() as LoaderData;

  console.log({ post });

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <figure>
            <img
              className="w-full rounded-lg"
              alt={post.coverImage.altText}
              src={urlFor(post.coverImage)
                .auto("format")
                .width(1310)
                .height(873)
                .url()}
            />
          </figure>

          <h1 className="mt-8 lg:mt-12">
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </span>
          </h1>
        </div>

        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <PortableText value={post.body} />
        </div>

        <div className="bg-white">
          <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">
                      Ready to find your dream home?
                    </span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-indigo-200">
                    Ac euismod vel sit maecenas id pellentesque eu sed
                    consectetur. Malesuada adipiscing sagittis vel nulla nec.
                  </p>
                  <Link
                    to={`/homes/TX/austin`}
                    className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Explore Homes
                  </Link>
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left sm:translate-x-16 lg:translate-y-20"
                  src={CallToActionImage}
                  alt="App screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
