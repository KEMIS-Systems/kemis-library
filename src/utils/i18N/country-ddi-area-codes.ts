//* This file was get from: https://github.com/jackocnr/intl-tel-input/releases/tag/v24.6.0

//* Array of country objects for the country dropdown.

//* Here is the criteria for the plugin to support a given country/territory
//* - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
//* - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
//* - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
//* - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

//* Each country array has the following information:
//* [
//*   iso2 code,
//*   International dial code,
//*   Order (if >1 country with same dial code),
//*   Area codes
//* ]

import { COUNTRY_TRANSLATIONS } from "./i18n";

// Types
import { Country } from "./types";

// Codes
import { rawCountryData } from "./codes";

export function getCountries(origin: string  = 'pt') {
  try {    
    const allCountries: Country[] = [];
    
    //* Loop over all of the countries above, restructuring the data to be objects with named keys.
    for (let i = 0; i < rawCountryData.length; i++) {
      const c = rawCountryData[i];
    
      allCountries[i] = {
        name: COUNTRY_TRANSLATIONS[origin][c[0]] || 'N/A',
        iso2: c[0],
        flagEmoji: getFlagEmoji(c[0]),
        dialCode: c[1],
        priority: c[2] || 0,
        areaCodes: c[3] || null,
        nodeById: {},
      };
    }
    
    return allCountries;
  } catch (error) {
    // do anything    
  }  
}
