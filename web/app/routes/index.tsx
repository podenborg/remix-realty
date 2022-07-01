import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLoaderData } from "@remix-run/react";
import { cities, footerNavigation, navigation } from "~/config";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { sanity, urlFor } from "~/services/sanity";
import type { BlogPost } from "~/types";

interface LoaderData {
  posts: BlogPost[];
}

export const loader: LoaderFunction = async () => {
  const posts = await sanity.fetch(`*[_type == "blogPost"]{
    body,
    title,
    coverImage,
    "slug": slug.current,    
  }[0..2]`);

  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData() as LoaderData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  console.log({ posts });

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            // src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            src={require("../assets/ralph-ravi-kayden-2d4lAQAlbDA-unsplash.jpeg")}
            alt=""
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        {/* Navigation */}
        <header className="relative z-10">
          <nav aria-label="Top">
            {/* Primary navigation */}
            <div className="backdrop-blur-md backdrop-filter bg-opacity-10 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="h-16 flex items-center justify-between">
                    {/* Logo (lg+) */}
                    <div className="hidden lg:flex-1 lg:flex lg:items-center">
                      <Link to="/">
                        <span className="sr-only">Workflow</span>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="hidden h-full lg:flex">
                      {/* Flyout menus */}
                      <Popover.Group className="px-4 bottom-0 inset-x-0">
                        <div className="h-full flex justify-center space-x-8">
                          {navigation.pages.map((page) => (
                            <a
                              key={page.name}
                              href={page.href}
                              className="flex items-center text-sm font-medium text-white hover:text-gray-200"
                            >
                              {page.name}
                            </a>
                          ))}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex-1 flex items-center lg:hidden">
                      <button
                        type="button"
                        className="-ml-2 p-2 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className="sr-only">Open menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Search */}
                      <a href="#" className="ml-2 p-2 text-white">
                        <span className="sr-only">Search</span>
                        <SearchIcon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    </div>

                    {/* Logo (lg-) */}
                    <Link to="/" className="lg:hidden">
                      <span className="sr-only">Workflow</span>
                      <img
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                        alt=""
                        className="h-8 w-auto"
                      />
                    </Link>

                    <div className="flex-1 flex items-center justify-end space-x-6">
                      <a
                        href="#"
                        className="text-sm font-medium text-white hover:text-gray-200"
                      >
                        Sign in
                      </a>
                      <a
                        href="#"
                        className="text-sm font-medium text-white hover:text-gray-200"
                      >
                        Create an account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
            Your dream home is waiting to be discovered
          </h1>
          <p className="mt-4 text-xl text-white">
            With the best selection of homes across the state of Texas, we make
            it easy to find the perfect home at unbeatable prices.
          </p>

          <form className="mt-5 sm:mt-8 w-full max-w-lg">
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-3 sm:py-4 px-4 rounded-none rounded-l-md sm:text-md border-gray-300"
                  placeholder="Enter an address, city, or zip code"
                />
              </div>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center space-x-2 px-5 py-2 text-sm font-medium rounded-r-md text-gray-700 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <SearchIcon className="h-6 w-6 text-white" aria-hidden="true" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
        >
          <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              Explore Homes
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all cities<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                  {cities.map((city) => (
                    <Link
                      key={city.name}
                      to={city.href}
                      className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={city.imageSrc}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="social-impact-heading"
          className="max-w-7xl mx-auto pt-24 px-4 sm:pt-32 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
              <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                <h2
                  id="social-impact-heading"
                  className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  Level up your home search
                </h2>
                <p className="mt-3 text-xl text-white">
                  Take your home search to the next level by consulting with one
                  of our certified real estate agents. We'll help you find great
                  homes that aren't listed on other sites and coach you on
                  making offers than homeowners won't be able to refuse.
                </p>
                <button className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
                  Contact a Realtor
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="max-w-xl mx-auto pt-24 sm:pt-32 lg:max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
        >
          <h2
            id="collection-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Read the Blog
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Every month our realtors share their insider knowledge to help you
            navigate today's housing market.
          </p>

          <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block"
              >
                <div
                  aria-hidden="true"
                  className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
                >
                  <img
                    alt={post.coverImage.altText}
                    src={urlFor(post.coverImage).auto("format").url()}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {post.body
                    .find(({ _type }) => _type === "block")
                    .children.filter(
                      (child: { _type: string }) => child._type === "span"
                    )
                    .map((span: { text: string }) => span.text)
                    .join("")
                    .slice(0, 120)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white">Explore</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.explore.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Company</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white">Account</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.account.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Connect</h3>
                  <ul className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a
                          href={item.href}
                          className="text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-16 xl:mt-0">
              <h3 className="text-sm font-medium text-white">
                Sign up for our newsletter
              </h3>
              <p className="mt-6 text-sm text-gray-300">
                Be the first to know about hot new listings in your area
              </p>
              <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-white rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
                />
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">
              Copyright &copy; {new Date().getFullYear()} Remix Realty LLC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
