let WebFont: typeof import("webfontloader") | undefined;
if (typeof window !== "undefined") {
  import("webfontloader").then((module) => {
    WebFont = module;
  });
}

const returnFontsArray = () => {
  const fonts = [
    {
      value: 1,
      label: "Imperial Script",
      className: "text-xl",
      family: "Imperial Script",
    },
    {
      value: 2,
      label: "Miss Fajardose",
      className: "text-xl",
      family: "Miss Fajardose",
    },
    {
      value: 3,
      label: "Waterfall",
      className: "text-xl",
      family: "Waterfall",
    },
    {
      value: 4,
      label: "Dancing Script",
      className: "text-xl",
      family: "Dancing Script",
    },
    {
      value: 5,
      label: "Great Vibes",
      className: "text-xl",
      family: "Great Vibes",
    },
    {
      value: 6,
      label: "Sacramento",
      className: "text-xl",
      family: "Sacramento",
    },
  ];

  if (typeof window !== "undefined" && WebFont) {
    WebFont.load({
      google: {
        families: fonts.map((font) => font.family),
      },
      active: () => {
        // Font loading completed, you can perform any necessary actions here
      },
    });
  }

  return fonts.map((font) => ({
    ...font,
    script: {
      style: {
        fontFamily: font.family,
      },
    },
  }));
};

export default returnFontsArray;
