export type Home = {
  // Sanity defined fields
  _id: string;
  _createdAt: string;
  _updatedAt: string;

  // User defined attributes
  media: any[];
  price: number;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: any[];
};
