export default {
  name: "home",
  title: "Homes",
  type: "document",
  fields: [
    {
      name: "media",
      title: "Media",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            accdept: "image/*",
          },
        },
      ],
      validation: (Rule) => Rule.required().min(4),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "address",
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .slice(0, 200)
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
        validation: (Rule) => Rule.required(),
      },
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "state",
      title: "State",
      type: "string",
      options: {
        list: [{ title: "Texas", value: "TX" }],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "zip",
      title: "Zip Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "sqft",
      title: "Square Feet",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "link",
      title: "Listing Link",
      type: "url",
    },
  ],
  preview: {
    select: {
      address: "address",
      city: "city",
      state: "state",
      media: "media.0",
    },
    prepare({ address, city, state, media }) {
      return {
        title: address,
        subtitle: `${city}, ${state}`,
        media: media,
      };
    },
  },
};
