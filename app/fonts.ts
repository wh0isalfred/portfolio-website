import localFont from "next/font/local";

export const bluuNext = localFont({
  src: [{ path: "./fonts/BluuNext-Bold.otf", weight: "700", style: "normal" }],
  variable: "--font-display",
  display: "swap",
});

export const sentient = localFont({
  src: [
    { path: "./fonts/Sentient-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Sentient-Italic.woff2",  weight: "400", style: "italic" },
    { path: "./fonts/Sentient-Medium.woff2",  weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});