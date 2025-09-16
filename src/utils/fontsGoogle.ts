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
      label: "Ms Madi",
      className: "text-xl",
      family: "'Ms Madi'",
    },
    {
      value: 2,
      label: "Mrs Saint Delafield",
      className: "text-xl",
      family: "'Mrs Saint Delafield'",
    },
    {
      value: 3,
      label: "Bilbo",
      className: "text-xl",
      family: "Bilbo",
    },
    {
      value: 4,
      label: "Meow Script",
      className: "text-xl",
      family: "'Meow Script'",
    },
    {
      value: 5,
      label: "Yellowtail",
      className: "text-xl",
      family: "Yellowtail",
    },
    {
      value: 6,
      label: "Sacramento",
      className: "text-xl",
      family: "Sacramento",
    },
  ];

  // if (typeof window !== "undefined" && WebFont) {
  //   WebFont.load({
  //     google: {
  //       families: fonts.map((font) => font.family),
  //     },
  //     active: () => {
  //       // Font loading completed, you can perform any necessary actions here
  //     },
  //   });
  // }

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
