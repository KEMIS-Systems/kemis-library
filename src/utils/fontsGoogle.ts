/**
 * Returns the font metadata used by the WriteSignature font picker.
 *
 * Fonts themselves are self-hosted via @font-face in src/styles/fonts/.
 * Previously this module also tried to dynamically load the same families
 * from Google Fonts via webfontloader, but that code path was disabled
 * (commented out) long ago and has now been removed entirely.
 */
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
