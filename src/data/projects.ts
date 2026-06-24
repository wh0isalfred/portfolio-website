export type Project = {
  slug: string;
  num: string;
  title: string;
  description: string;
  tech: string[];
  cover: string;
  url: string;
  live: string;
  repo: string;
};

export const projects: Project[] = [
  {
    slug: "seecom",
    num: "01",
    title: "SEE.COM",
    description:
      "Nigerian streetwear, end to end — storefront, live payments, and an admin to run the whole thing.",
    tech: ["React", "Supabase", "Paystack"],
    cover: "/projects/seecom/cover.jpg",
    url: "seecom.vercel.app",
    live: "https://seecom.vercel.app",
    repo: "https://github.com/wh0isalfred/seecom",
  },
  {
    slug: "bonsai",
    num: "02",
    title: "Bonsai",
    description:
      "Media compression tool — trim the size, keep the quality. Runs entirely in the browser.",
    tech: ["React", "Client-side"],
    cover: "/projects/bonsai/cover.jpg",
    url: "bonsai-blue-tau.vercel.app",
    live: "https://bonsai-blue-tau.vercel.app",
    repo: "https://github.com/wh0isalfred/Bonsai.",
  },
  {
    slug: "tajo",
    num: "03",
    title: "Tajo Partners",
    description:
      "Company website for a human resource and virtual assistant company.",
    tech: ["React", "CMS"],
    cover: "/projects/tajo/cover.jpg",
    url: "tajopartners.info",
    live: "https://tajopartners.info",
    repo: "",
  },
  {
    slug: "samuel-richard",
    num: "04",
    title: "Samuel Richard",
    description:
      "Portfolio for an architect — fully editable by the admin, no code needed.",
    tech: ["React", "CMS"],
    cover: "/projects/samuel-richard/cover.jpg",
    url: "samuel-richard.vercel.app",
    live: "https://samuel-richard.vercel.app",
    repo: "https://github.com/wh0isalfred/samuelRichard",
  },
];
