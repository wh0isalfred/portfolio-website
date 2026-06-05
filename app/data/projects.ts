export type Project = {
  slug: string;
  num: string;
  lead: string;      // name, normal part
  accent: string;    // name, gold part
  title: string;     // full name (for alt text)
  tech: string;
  cover: string;
  description: string;
};

export const projects: Project[] = [
  {
    slug: "seecom",
    num: "01",
    lead: "SEE.",
    accent: "COM",
    title: "SEE.COM",
    tech: "React · Supabase · Paystack",
    cover: "/projects/seecom/cover.jpg",
    description:
      "Nigerian streetwear, end to end — storefront, live payments, and an admin to run the whole thing.",
  },
  {
    slug: "samuel-richard",
    num: "02",
    lead: "Samuel ",
    accent: "Richard",
    title: "Samuel Richard",
    tech: "React · CMS",
    cover: "/projects/samuel-richard/cover.jpg",
    description:
      "A portfolio for an architect — fully editable by the admin, no code needed.",
  },
  {
    slug: "bonsai",
    num: "03",
    lead: "Bon",
    accent: "sai",
    title: "Bonsai",
    tech: "React · Client-side processing",
    cover: "/projects/bonsai/cover.jpg",
    description:
      "My Media compression tool — trim the size, keep the quality.",
  },
  
];