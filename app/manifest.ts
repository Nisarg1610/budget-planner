export default function manifest() {
  return {
    name: "Budget Planner",
    short_name: "Budget",
    description: "Track your income and expenses",
    start_url: "/",
    display: "standalone",
    background_color: "#BDE8F5",
    theme_color: "#0F2854",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
