const preprocess = require("svelte-preprocess");

export default (production) => {
  return {
    preprocess: preprocess({
      sourceMap: !production,
      defaults: {
        style: "scss",
      },
      postcss: {
        plugins: [require("autoprefixer")],
      },
    }),
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css: (css) => {
      css.write("bundle.css");
    },
  };
};
