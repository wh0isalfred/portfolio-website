export type Project = {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  problem: string;
  build: string;
  outcome: string;
  tech: string[];
  highlights?: string[];
  cover: string;
  url: string;
  live: string;
  repo: string;
  render: boolean;
};

export const projects: Project[] = [
  {
    slug: "kit",
    num: "01",
    title: "KIT Academy",
    tagline: "Multi-batch tech education platform for Nigerian kids",
    problem:
      "Running a coding program for 10–15 year olds as a solo founder, across several batches at once, with no way to see at a glance who needs attention.",
    build:
      "Next.js 16 + Supabase, with two auth models coexisting on purpose — signed HMAC cookies for no-account summer camp access, full Supabase Auth with row-level security for the 12-week track — plus a FIFO homework grading queue with optimistic UI, and an end-to-end Paystack pipeline: apply, pay, webhook confirms, admin approves, ID and email auto-generated.",
    outcome:
      "Full admissions-to-classroom pipeline shipped before the first cohort even starts — 26 live, RLS-gated migrations running the whole platform.",
    tech: ["Next.js 16", "Supabase", "Paystack", "Resend"],
    highlights: [
      "Two coexisting auth models for two different program types",
      "FIFO grading queue with optimistic UI updates",
      "Multi-tab admin shell running several concurrent batches independently",
    ],
    cover: "/projects/kit/cover.jpg",
    url: "kitacademy.net",
    live: "https://kitacademy.net",
    repo: "",
    render: true,
  },
  {
    slug: "seecom",
    num: "02",
    title: "SEE.COM",
    tagline: "End-to-end storefront for a Nigerian streetwear brand",
    problem:
      "No affordable, all-in-one storefront for local streetwear brands — most alternatives meant stitching together several disconnected tools.",
    build:
      "React storefront on Supabase with live Paystack checkout, and an admin panel to run the catalog, orders, and payments from one place.",
    outcome: "Live in production, handling real customer transactions.",
    tech: ["React", "Supabase", "Paystack"],
    highlights: [],
    cover: "/projects/seecom/cover.jpg",
    url: "seecom.vercel.app",
    live: "https://seecom.vercel.app",
    repo: "https://github.com/wh0isalfred/seecom",
    render: true,
  },
  {
    slug: "sdmembs",
    num: "03",
    title: "S&D Membs Security",
    tagline: "Coverage map and lead capture for a licensed security company",
    problem:
      "A licensed private security company needed a professional web presence — armed and unarmed guarding, residential, commercial, K9, CCTV — with a clear way to show coverage area and capture leads.",
    build:
      "React + Vite + Tailwind CSS v4 site with an interactive 37-state Nigeria coverage map built from raw SVG boundary data, backed by a component-class system consolidated from scattered Tailwind utilities.",
    outcome:
      "Live site with a working coverage map and lead capture across every listed service line.",
    tech: ["React", "Vite", "Tailwind CSS v4", "React Router"],
    highlights: [
      "Interactive 37-state Nigeria coverage map from raw SVG boundary data",
      "Diagnosed and fixed a geographic data bug via source cross-referencing",
      "Fixed a production SPA-routing 404 on Vercel",
    ],
    cover: "/projects/sdmembs/cover.jpg",
    url: "sdmembs.vercel.app",
    live: "https://sdmembs.vercel.app",
    repo: "https://github.com/wh0isalfred/sdmembs",
    render: true,
  },
  {
    slug: "bonsai",
    num: "04",
    title: "Bonsai",
    tagline: "Client-side media compression, no server involved",
    problem:
      "Compressing media usually means uploading to a third-party server — a privacy and speed tradeoff nobody actually asked for.",
    build: "Media compression tool that runs entirely in the browser, client-side, start to finish.",
    outcome: "Trims file size, keeps quality, never leaves the user's device.",
    tech: ["React", "Client-side"],
    highlights: [],
    cover: "/projects/bonsai/cover.jpg",
    url: "bonsai-blue-tau.vercel.app",
    live: "https://bonsai-blue-tau.vercel.app",
    repo: "https://github.com/wh0isalfred/Bonsai.",
    render: true,
  },
  {
    slug: "tajo",
    num: "05",
    title: "Tajo Partners",
    tagline: "CMS-editable site for an HR and virtual assistant company",
    problem: "An HR and virtual assistant company needed a site their own team could update without touching code.",
    build: "React front end wired to a CMS, so content changes are a form fill, not a deploy.",
    outcome: "Company runs and updates the site independently, post-launch.",
    tech: ["React", "CMS"],
    highlights: [],
    cover: "/projects/tajo/cover.jpg",
    url: "tajopartners.info",
    live: "https://tajopartners.info",
    repo: "",
    render: true,
  },
  {
    slug: "samuel-richard",
    num: "06",
    title: "Samuel Richard",
    tagline: "Fully admin-editable portfolio for an architect",
    problem: "An architect needed a portfolio he could fully edit himself after launch, with zero code required.",
    build: "React portfolio backed by an admin panel covering every editable section of the site.",
    outcome: "Client updates his own portfolio independently, no developer involvement needed.",
    tech: ["React", "CMS"],
    highlights: [],
    cover: "/projects/samuel-richard/cover.jpg",
    url: "samuel-richard.vercel.app",
    live: "https://samuel-richard.vercel.app",
    repo: "https://github.com/wh0isalfred/samuelRichard",
    render: true,
  },
];
