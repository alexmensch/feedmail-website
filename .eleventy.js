import * as sass from "sass";
import path from "node:path";

export default function (eleventyConfig) {
  /* SCSS compilation as a template format */
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",

    compileOptions: {
      permalink(inputContent, inputPath) {
        const parsed = path.parse(inputPath);
        return path.join("/assets/css", `${parsed.name}.css`);
      },
    },

    async compile(inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return () => "";
      }

      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
      });

      return async () => result.css;
    },
  });

  // Don't process SCSS partials as pages
  eleventyConfig.ignores.add("src/assets/scss/**/_*.scss");

  /* Passthrough copy */
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/404.html": "404.html" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["liquid", "md", "scss"],
    htmlTemplateEngine: "liquid",
  };
}
