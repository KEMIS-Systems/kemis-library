import {
  InputMask as InputMaskPrime
} from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Controller,
  FieldPath
} from "react-hook-form";

// Icons
import { MdSearch } from "react-icons/md";

// Components
import MessageError from "../MessageError";

// Utils
import { debounce } from "../../../utils/debounce";
import { getCountries } from "../../../utils/i18N/country-ddi-area-codes";

// Types
import { Country } from "../../../utils/i18N/types";
import { IInputMaskProps } from "./types";

function InputMask({
  rules,
  form,
  name,
  label,
  className,
  i18N = false,
  lang = 'pt',
  mask,
  ...props
}: IInputMaskProps<any>) {

  const [countrySelected, setCountrySelected] = useState<Country | null>(null)
  const [searchCountry, setSearchCountry] = useState<string>('')

  // AUX Variables
  const COUNTRY_SELECTED_ELEMENT_REF = useRef<any>()
  const COUNTRIES = useMemo(() => {
    const SEARCH_VALUE =  searchCountry?.trim()?.toLocaleLowerCase() || null
    const COUNTRIES =  getCountries(lang) || []

    if(SEARCH_VALUE) {
      return COUNTRIES.filter(d => d.dialCode.includes(SEARCH_VALUE) || d.iso2InLower.includes(SEARCH_VALUE) || d.nameInLower.includes(SEARCH_VALUE))
    }

    return COUNTRIES;
  }, [searchCountry])
  const INPUT_MASK = useMemo(() => {
    return countrySelected?.iso2 === 'br' ? mask : '+?*?*?*? *?*?*?*?*?*?*?*?*?*?*?*'
  }, [countrySelected])
  const DONT_CLEAR = useMemo(() => {
    return countrySelected?.iso2 === 'br' ? true : false
  }, [countrySelected])

  useEffect(() => {
    setCountrySelected(COUNTRIES?.find(c => c.iso2 === 'br') || null)
  }, [COUNTRIES])

  useEffect(() => {
    if(countrySelected?.iso2 !== 'br') {
      const RAW_VALUE = form.getValues()[name]?.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') || ''
      const PARSED_INPUT_VALUE = RAW_VALUE?.split(' ')[1] || RAW_VALUE       

      form.setValue(name, `+${countrySelected?.dialCode} ${PARSED_INPUT_VALUE}`)
    }
  }, [countrySelected])

  function handlerSetCountry(country: Country | null = null) {
    try {
      if(!country || !COUNTRY_SELECTED_ELEMENT_REF.current) return;

      // @ts-ignore
      COUNTRY_SELECTED_ELEMENT_REF.current.click()

      setCountrySelected(country)
    } catch (error) {
      // do anything
    }
  }

  return (
    <div className={className ?? ""}>
      {form && (
        <Controller
          name={name as FieldPath<{}>}
          control={form.control}
          rules={rules}
          render={({ field: { ref, ...field }, fieldState }) => {
            return (
              <>
                <label
                  htmlFor={field.name}
                  data-haserror={fieldState.error && true}
                  className="block data-[haserror=true]:text-red-500"
                >
                  {label}
                  <span data-isrequred={rules?.required && true} className="hidden data-[isrequired=true]:block text-slate-300"> *</span>
                </label>
                <span 
                  data-hasI18N={i18N}
                  className="w-full h-auto flex flex-row items-center justify-start gap-3                    
                    data-[hasI18N=true]:p-4
                    data-[hasI18N=true]:border-[1px]
                    data-[hasI18N=true]:border-slate-300
                    data-[hasI18N=true]:rounded-xl
                  "
                >
                  <span
                    data-hasI18N={i18N}
                    className="w-auto h-full
                      hidden
                      data-[hasI18N=true]:flex 
                      flex-row items-center justify-center gap-4
                      relative
                    "
                  >
                    <input type="checkbox" 
                      ref={COUNTRY_SELECTED_ELEMENT_REF}
                      name="country-box-select" 
                      id="country-box-select" 
                      className="peer/CountryBox hidden"
                    />

                    <button
                      title={countrySelected?.name || ''}
                      type="button"
                      onClick={() => COUNTRY_SELECTED_ELEMENT_REF.current.click()}
                      className="w-10 h-full  
                        rounded-md 
                        bg-white
                        border-[1px] border-slate-300
                        flex flex-row items-center justify-center px-4 py-2
                        hover:bg-slate-200
                        transition-all
                        duration-[0.3s]
                        cursor-pointer
                      "
                    >
                      {countrySelected?.flagEmoji}
                    </button>

                    <div className="min-w-28 w-auto h-0
                        absolute
                        top-10
                        left-0
                        rounded-xl
                        border-[1px]
                        border-slate-300
                        bg-white
                        flex
                        opacity-0
                        z-[-1]
                        pointer-events-none
                        peer-checked/CountryBox:opacity-100
                        peer-checked/CountryBox:z-[999]
                        peer-checked/CountryBox:pointer-events-auto
                        peer-checked/CountryBox:h-52
                        peer-checked/CountryBox:shadow-xl
                        flex-col gap-2
                        transition-all
                        duration-[0.3s]
                      "
                    >
                      <span className="w-full h-12
                          border-b-[1px] border-slate-300 p-3
                          flex flex-row flex-flex-nowrap items-center gap-3
                        "
                      >
                        <MdSearch className="text-slate-300" />
                        <input
                          type="text" 
                          className="border-0 bg-transparent"
                          onChange={(e) => debounce(250, setSearchCountry, e.target.value)}
                          placeholder={countrySelected?.searchPlaceholder || 'Pesquise por pais'}
                        />
                      </span>

                      <ul className="m-0 flex-1 flex flex-col gap-4 overflow-y-auto px-3 pb-3">
                        {
                          COUNTRIES?.map(country => (
                            <li
                              title={country.name}
                              role="button"
                              onClick={() => handlerSetCountry(country)}
                              key={country.iso2}
                              data-hasselected={countrySelected?.iso2 === country.iso2}
                              className="w-full h-auto p-3 
                                flex flex-row items-center gap-3
                                rounded-xl
                                data-[hasselected=false]:hover:bg-slate-100
                                data-[hasselected=true]:bg-slate-100
                                text-slate-900
                                cursor-pointer
                              "
                            >
                              <span>
                                {country.flagEmoji}
                              </span>
                              <span>
                                {country.name}
                              </span>
                              <span className="text-slate-200 ml-4 text-sm">
                                +{country.dialCode}
                              </span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </span>

                  <InputMaskPrime
                    {...field}
                    ref={ref}
                    name={field.name}
                    id={field.name}
                    // defaultValue={countryNumber}
                    className={
                      classNames({ "p-invalid ": fieldState.error }) +
                      " w-full disabled:bg-slate-100"
                    }
                    // onChange={(event) => onSetDDICode(event.value)}
                    mask={INPUT_MASK}
                    autoClear={DONT_CLEAR}
                    {...props}
                  />
                </span>
                {<MessageError fieldState={fieldState} />}
              </>
            );
          }}
        />
      )}
    </div>
  );
}

export default InputMask;
