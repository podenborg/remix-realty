export default {
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    {
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      fields: [
        {
          name: "altText",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      coverImage: "coverImage",
    },
    prepare({ title, publishedAt, coverImage }) {
      return {
        title: title,
        subtitle: `Published: ${publishedAt}`,
        media: coverImage,
      };
    },
  },
};
