import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { classNames, deslug, formatPrice } from "~/utils";
import { sanity, urlFor } from "~/services/sanity";
import type { Home } from "~/types";
import { FaBath, FaBed, FaRuler } from "react-icons/fa";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "House", href: "#" },
  { name: "Condos", href: "#" },
  { name: "Townhome", href: "#" },
  { name: "Multi-Family", href: "#" },
];
const filters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "$10k - $250k", label: "$10k - $250k", checked: false },
      { value: "$250k - $500k", label: "$250k - $500k", checked: true },
      { value: "$500k - $800k", label: "$500k - $800k", checked: false },
      { value: "$800k - $1.5m", label: "$800k - $1.5m", checked: false },
      { value: "$1.5m+", label: "$1.5m+", checked: false },
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    options: [
      { value: "studio+", label: "Studio+", checked: true },
      { value: "1+", label: "1+", checked: false },
      { value: "2+", label: "2+", checked: false },
      { value: "3+", label: "3+", checked: false },
      { value: "4+", label: "4+", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "0+ sq ft", label: "0+ sq ft", checked: true },
      { value: "1000+ sq ft", label: "1000+ sq ft", checked: false },
      { value: "2000+ sq ft", label: "2000+ sq ft", checked: false },
      { value: "3000+ sq ft", label: "3000+ sq ft", checked: false },
    ],
  },
];

type LoaderData = {
  homes: Home[];
  city: string;
  state: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { city: citySlug, state } = params;

  if (!citySlug || !state) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const city = deslug(citySlug);

  const homes = await sanity.fetch(
    `*[_type == "home" && city == $city] {
      ...,
      "slug": slug.current,             
    }`,
    { city: city }
  );

  return json<LoaderData>({ homes, city, state });
};

export default function HomesByCity() {
  const location = useLocation();
  const { homes, city, state } = useLoaderData() as LoaderData;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="font-medium text-gray-900 px-2 py-3">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Homes in {city}, {state}
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View grid</span>
              <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href}>{category.name}</a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Home grid */}
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
              {homes.length > 0 ? (
                homes.map((home) => {
                  console.log({ home });
                  return (
                    <Link
                      key={home.slug}
                      to={`${location.pathname}/${home.slug}`}
                      className="relative group text-sm"
                    >
                      <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                        <img
                          src={urlFor(home.media[0])
                            .auto("format")
                            .height(448)
                            .url()}
                          alt={home.slug}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <h3 className="mt-4 text-base font-medium text-gray-900">
                        {home.address}
                      </h3>

                      <ol className="mt-2 flex items-center space-x-3">
                        <li className="flex items-center">
                          <FaBed className="text-gray-400" />
                          <span className="ml-1 text-gray-500 font-medium text-sm">
                            {home.bedrooms} bd
                          </span>
                        </li>
                        <li className="flex items-center">
                          <FaBath className="text-gray-400" />
                          <span className="ml-1 text-gray-500 font-medium text-sm">
                            {home.bathrooms} ba
                          </span>
                        </li>
                        <li className="flex items-center">
                          <FaRuler className="text-gray-400" />
                          <span className="ml-1 text-gray-500 font-medium text-sm">
                            {home.sqft} sqft
                          </span>
                        </li>
                      </ol>
                      <p className="mt-3 font-medium text-gray-900">
                        {formatPrice(home.price)}
                      </p>
                    </Link>
                  );
                })
              ) : (
                <div className="py-10 col-span-2 lg:col-span-3 flex flex-col justify-center items-center">
                  <h4 className="max-w-lg text-center font-semibold text-gray-800">
                    We didn't find any homes available in {city}, {state}.
                    Please try searching in a different location or
                    neighborhood.
                  </h4>
                  <SearchIcon className="mt-3 text-gray-500 h-10 w-10" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
