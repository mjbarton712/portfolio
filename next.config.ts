import type { NextConfig } from "next";

// For GitHub Pages under a *project* repo, assets live at /<repo>/.
// The deploy workflow sets PAGES_BASE_PATH (e.g. "/portfolio").
// Leave it empty for local dev or a user/org root site.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
