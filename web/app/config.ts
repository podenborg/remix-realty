import AustinCoverImage from "./assets/brian-babb-XbwHrt87mQ0-unsplash.jpeg";
import DallasCoverImage from "./assets/daniel-barnes-RKdLlTyjm5g-unsplash.jpeg";
import HoustonCoverImage from "./assets/david-veksler-VW5YwCYbPyk-unsplash.jpeg";
import ElPasoCoverImage from "./assets/emmy-gaddy-b2V0fdhMVCE-unsplash.jpeg";
import SanAntonioCoverImage from "./assets/micah-carlson-qN-T-pY17Vc-unsplash.jpeg";

/* Header Navigation */
export const navigation = {
  pages: [
    { name: "Buy", href: "#" },
    { name: "Rent", href: "#" },
    { name: "Blog", href: "#" },
    { name: "About", href: "#" },
  ],
};

/* Footer Navigation */
export const footerNavigation = {
  explore: [
    { name: "Austin, TX", href: "/homes/TX/austin" },
    { name: "Dallas, TX", href: "/homes/TX/dallas" },
    { name: "Houston, TX", href: "/homes/TX/houston" },
    { name: "San Antonio, TX", href: "/homes/TX/san-antonio" },
    { name: "El Paso, TX", href: "/homes/TX/el-paso" },
  ],
  company: [
    { name: "Who We Are", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  account: [
    { name: "Manage Account", href: "#" },
    { name: "Saved Listings", href: "#" },
    { name: "List My Home", href: "#" },
  ],
  connect: [
    { name: "Contact Us", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
  ],
};

export const cities = [
  {
    name: "Austin, TX",
    href: "/homes/TX/austin",
    imageSrc: AustinCoverImage,
  },
  {
    name: "Dallas, TX",
    href: "/homes/TX/dallas",
    imageSrc: DallasCoverImage,
  },
  {
    name: "Houston, TX",
    href: "/homes/TX/houston",
    imageSrc: HoustonCoverImage,
  },
  {
    name: "El Paso, TX",
    href: "/homes/TX/el-paso",
    imageSrc: ElPasoCoverImage,
  },
  {
    name: "San Antonio, TX",
    href: "/homes/TX/san-antonio",
    imageSrc: SanAntonioCoverImage,
  },
];
