import { useLanguage } from "../index";
import enTranslations from "../languages/en.json";
import esTranslations from "../languages/es.json";
import ptTranslations from "../languages/pt.json";

describe("useLanguage hook", () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = { ...window };
  });

  afterEach(() => {
    for (const key in window) {
      /* Checks if the property exists in the original window object.
      If it doesn't, it means the property was added during the test. */
      if (!(key in originalWindow)) {
        // Cleans up modified properties.
        delete window[key];
      }
    }
  });

  it("should return enLanguage based when window object is defined", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      location: { pathname: "/en/path" },
    }));

    const { language } = useLanguage();
    expect(language).toEqual(enTranslations);

    windowSpy.mockRestore();
  });

  it("should return esLanguage based when window object is defined", () => {
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      location: { pathname: "/es/path" },
    }));

    const { language } = useLanguage();
    expect(language).toEqual(esTranslations);

    windowSpy.mockRestore();
  });

  it("should return default language (pt) when window object is not defined", () => {
    const { language } = useLanguage();
    expect(language).toEqual(ptTranslations);
  });
});
