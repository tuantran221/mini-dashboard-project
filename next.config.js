// next.config.js
module.exports = {
  // Add this line to your configuration
  target: "experimental-serverless-trace",
  distDir: "out",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      // Add any other pages you want to export
    };
  },
};
