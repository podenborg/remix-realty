import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import { classNames, formatPrice } from "~/utils";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { sanity, urlFor } from "~/services/sanity";
import type { Home } from "~/types";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { PortableText } from "@portabletext/react";
import { FaBath, FaBed, FaRuler } from "react-icons/fa";

const dates = [
  { dayOfWeek: "TUE", date: "28", available: false },
  { dayOfWeek: "WED", date: "29", available: false },
  { dayOfWeek: "THU", date: "30", available: true },
  { dayOfWeek: "FRI", date: "1", available: true },
  { dayOfWeek: "SAT", date: "2", available: true },
  { dayOfWeek: "SUN", date: "3", available: true },
  { dayOfWeek: "MON", date: "4", available: true },
  { dayOfWeek: "TUE", date: "5", available: true },
];

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "TUE", inStock: false },
    { name: "WED", inStock: false },
    { name: "THU", inStock: true },
    { name: "FRI", inStock: true },
    { name: "SAT", inStock: true },
    { name: "SUN", inStock: true },
    { name: "MON", inStock: true },
    { name: "TUE", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = {
  href: "#",
  average: 4,
  totalCount: 117,
  featured: [
    {
      id: 1,
      title: "This is the best white t-shirt out there",
      rating: 5,
      content: `
        <p>I've searched my entire life for a t-shirt that reflects every color in the visible spectrum. Scientists said it couldn't be done, but when I look at this shirt, I see white light bouncing right back into my eyes. Incredible!</p>
      `,
      author: "Mark Edwards",
      avatarSrc:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      title: "Adds the perfect variety to my wardrobe",
      rating: 4,
      content: `
        <p>I used to be one of those unbearable minimalists who only wore the same black v-necks every day. Now, I have expanded my wardrobe with three new crewneck options! Leaving off one star only because I wish the heather gray was more gray.</p>
      `,
      author: "Blake Reid",
      avatarSrc:
        "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    },
    {
      id: 3,
      title: "All good things come in 6-Packs",
      rating: 5,
      content: `
        <p>Tasty beverages, strong abs that will never be seen due to aforementioned tasty beverages, and these Basic Tees!</p>
      `,
      author: "Ben Russel",
      avatarSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ],
};

interface LoaderData {
  home: Home & { similarHomes: Home[] };
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const home = await sanity.fetch(
    `*[_type == "home" && slug.current == $slug] {
      ...,
      "slug": slug.current,
      "similarHomes": *[_type=='home' && city == ^.city && _id != ^._id]{...},       
    }[0]`,
    { slug }
  );

  if (!home) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>({ home });
};

export default function HomeDetails() {
  const { home } = useLoaderData() as LoaderData;
  const { state, city } = useParams();
  const [selectedDate, setSelectedDate] = useState(dates[2].date);

  console.log({ home });

  return (
    <main className="pt-10 sm:pt-16">
      <nav aria-label="Breadcrumb">
        <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
            <div className="flex items-center">
              <Link to={`/`} className="mr-2 text-sm font-medium text-gray-900">
                {home.state}
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <Link
                to={`/homes/${state}/${city}`}
                className="mr-2 text-sm font-medium text-gray-900"
              >
                {home.city}
              </Link>
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-5 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li className="text-sm">
            <p
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {home.address}
            </p>
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
          <img
            alt={`${home.address} - Media 1`}
            src={urlFor(home.media[0]).auto("format").url()}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img
              alt={`${home.address} - Media 2`}
              src={urlFor(home.media[1]).auto("format").url()}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img
              alt={`${home.address} - Media 3`}
              src={urlFor(home.media[2]).auto("format").url()}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
          <img
            alt={`${home.address} - Media 4`}
            src={urlFor(home.media[3]).auto("format").url()}
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="max-w-2xl mx-auto pt-10 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {home.address}
          </h1>
          <p className="text-gray-500 mt-2">
            {home.city}, {home.state}
          </p>
        </div>

        {/* Options */}
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="sr-only">Home information</h2>
          <p className="text-3xl text-gray-900">{formatPrice(home.price)}</p>

          {/* Reviews */}
          <div className="mt-3">
            <h3 className="sr-only">Estimated Mortgage</h3>
            <div className="flex items-center">
              <p className="text-sm text-gray-800">
                Est. Mortgage {formatPrice(Math.floor(home.price / 158.91))}/mo*
              </p>
            </div>
          </div>

          <form className="mt-10">
            {/* Highlights */}
            <div>
              <h3 className="text-sm text-gray-900 font-medium">Highlights</h3>

              <ol className="mt-4 flex items-center space-x-5">
                <li className="flex items-center">
                  <FaBed className="text-gray-600" />
                  <span className="ml-2 text-gray-700 font-medium text-sm">
                    {home.bedrooms} bd
                  </span>
                </li>
                <li className="flex items-center">
                  <FaBath className="text-gray-600" />
                  <span className="ml-2 text-gray-700 font-medium text-sm">
                    {home.bathrooms} ba
                  </span>
                </li>
                <li className="flex items-center">
                  <FaRuler className="text-gray-600" />
                  <span className="ml-2 text-gray-700 font-medium text-sm">
                    {home.sqft} sqft
                  </span>
                </li>
              </ol>
            </div>

            {/* Tour Dates */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 font-medium">Dates</h3>
                <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Tour Information
                </p>
              </div>

              <RadioGroup
                value={selectedDate}
                onChange={setSelectedDate}
                className="mt-4"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a date
                </RadioGroup.Label>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {dates.map((date) => (
                    <RadioGroup.Option
                      key={date.date}
                      value={date.date}
                      disabled={!date.available}
                      className={({ active }) =>
                        classNames(
                          date.available
                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                          active ? "ring-2 ring-indigo-500" : "",
                          "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label
                            as="p"
                            className="flex flex-col justify-center items-center"
                          >
                            <span>{date.dayOfWeek}</span>
                            <span>{date.date}</span>
                          </RadioGroup.Label>
                          {date.available ? (
                            <span
                              className={classNames(
                                active ? "border" : "border-2",
                                checked
                                  ? "border-indigo-500"
                                  : "border-transparent",
                                "absolute -inset-px rounded-md pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                            >
                              <svg
                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line
                                  x1={0}
                                  y1={100}
                                  x2={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <button
              type="submit"
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Schedule a Tour
            </button>
          </form>
        </div>

        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6 prose prose-indigo">
              <PortableText value={home.description} />
            </div>
          </div>

          {/* <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* <section aria-labelledby="shipping-heading" className="mt-10">
            <h2
              id="shipping-heading"
              className="text-sm font-medium text-gray-900"
            >
              Details
            </h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product.details}</p>
            </div>
          </section> */}
        </div>

        {/* <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">          
          <section
            aria-labelledby="reviews-heading"
            className="border-t border-gray-200 pt-10 lg:pt-16"
          >
            <h2 id="reviews-heading" className="sr-only">
              Reviews
            </h2>

            <div className="space-y-10">
              {reviews.featured.map((review) => (
                <div key={review.id} className="flex flex-col sm:flex-row">
                  <div className="mt-6 order-2 sm:mt-0 sm:ml-16">
                    <h3 className="text-sm font-medium text-gray-900">
                      {review.title}
                    </h3>
                    <p className="sr-only">{review.rating} out of 5 stars</p>

                    <div
                      className="mt-3 space-y-6 text-sm text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>

                  <div className="order-1 flex items-center sm:flex-col sm:items-start">
                    <img
                      src={review.avatarSrc}
                      alt={`${review.author}.`}
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="ml-4 sm:ml-0 sm:mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        {review.author}
                      </p>
                      <div className="mt-2 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-gray-900"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div> */}
      </div>

      <section aria-labelledby="related-products-heading" className="bg-white">
        <div className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2
            id="related-products-heading"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Similar Homes in {home.city}, {home.state}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {home.similarHomes.map((similarHome) => (
              <Link
                to={`/homes/${state}/${city}/${similarHome.slug?.current}`}
                key={similarHome._id}
                className="group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    alt={similarHome.address}
                    src={urlFor(similarHome.media[0]).auto("format").url()}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {similarHome.address}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {similarHome.city}, {similarHome.state}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(similarHome.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
