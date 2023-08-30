import * as Zod from 'zod';
import { useLanguage } from '../../Language';

const { language } = useLanguage()

// CREATE A GENERIC SCHEMA OBJECT
export const GeneralSchema = Zod.object({
  /** A regra de negócio foi implementada com base no "artigo" de souforce
   * @see https://souforce.cloud/regra-de-validacao-para-cpf-e-cnpj-no-salesforce/
   */
  document: Zod.optional(Zod.string({
    invalid_type_error: "Insira um número correto"
  }).refine((value) => {

    const cleanValue = (value as string).replace(/[^\w\s]/gi, '').trim()

    // console.log('document@validation step', value, cleanValue, cleanValue.length)

    let isValidDocument = false

    switch (cleanValue.length) {
      case 11:
        const splitedDocument = cleanValue.split("")
        const splitedValueRaw = splitedDocument
        const weightsDigitCPF = [10, 9, 8, 7, 6, 5, 4, 3, 2]
        const weightsSecondDigitCPF = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        const splitedValue = splitedValueRaw.slice(0, cleanValue.length - 2)

        let firstDigit = null
        let secondDigit = null
        let calcDigit = null

        let multiplyToFirstDigit = 0
        let multiplyToSecondDigit = 0

        for (let i = 0; i < splitedValue.length; i++) {
          // @ts-ignore
          multiplyToFirstDigit += (splitedValue[i] * weightsDigitCPF[i])
        }

        // Se o resultado da subtração for maior que 9, o dígito verificador é ZERO. 
        // Caso contrário, o dígito verificador é o resultado dessa subtração. 
        // Neste caso, o primeiro dígito verificador é ZERO.
        calcDigit = cleanValue.length - (multiplyToFirstDigit % cleanValue.length)

        if (calcDigit > 9) {
          firstDigit = 0
        } else {
          firstDigit = calcDigit
        }

        splitedValue.push(firstDigit.toString())

        // SECOND DIGIT

        for (let i = 0; i < splitedValue.length; i++) {
          // @ts-ignore
          multiplyToSecondDigit += (splitedValue[i] * weightsSecondDigitCPF[i])
        }

        // O resultado da subtração não é maior que 9, o resultado é o próprio dígito verificador.
        secondDigit = cleanValue.length - (multiplyToSecondDigit % cleanValue.length)

        if (splitedDocument[splitedDocument.length - 2] === firstDigit.toString()
          &&
          splitedDocument[splitedDocument.length - 1] === secondDigit.toString()

        ) {
          isValidDocument = true
        }

        value.replace("-", ".").split(".").forEach(group => {
          if (/(\d)\1{2}/g.test(group)) isValidDocument = false
        })

        break;
      case 14:
        const splitedDocumentCNPJ = cleanValue.split("")
        const splitedDocumentCNPJRaw = splitedDocumentCNPJ.slice(0, splitedDocumentCNPJ.length - 2)
        const weightsFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const weightsSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

        let firstDigitCNPJ = null
        let secondDigitCNPJ = null


        let multiplyToFirstDigitCNPJ = 0
        let multiplyToSecondDigitCNPJ = 0

        for (let i = 0; i < splitedDocumentCNPJRaw.length; i++) {
          // @ts-ignore
          multiplyToFirstDigitCNPJ += (splitedDocumentCNPJRaw[i] * weightsFirstDigit[i])
        }

        const restOfFirstDigitCalc = multiplyToFirstDigitCNPJ % 11

        if (restOfFirstDigitCalc < 2) {
          firstDigitCNPJ = 0
        } else {
          firstDigitCNPJ = 11 - restOfFirstDigitCalc
        }

        // SECOND DIGIT
        splitedDocumentCNPJRaw.push(firstDigitCNPJ!.toString())

        for (let i = 0; i < splitedDocumentCNPJRaw.length; i++) {
          // @ts-ignore
          multiplyToSecondDigitCNPJ += (splitedDocumentCNPJRaw[i] * weightsSecondDigit[i])
        }

        const restOfSecondDigitCalc = multiplyToSecondDigitCNPJ % 11

        if (restOfSecondDigitCalc < 2) {
          secondDigitCNPJ = 0
        } else {
          secondDigitCNPJ = 11 - restOfSecondDigitCalc
        }

        if (splitedDocumentCNPJ[splitedDocumentCNPJ.length - 2] === firstDigitCNPJ?.toString() && splitedDocumentCNPJ[splitedDocumentCNPJ.length - 1] === secondDigitCNPJ?.toString()) {
          isValidDocument = true
        }

        if (!/^(?!(\d)\1\.\1{3}\.\1{3}\/\1{4}-\1{2}$)\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value)) isValidDocument = false

        break;
      default:
        isValidDocument = true
    }

    return isValidDocument
  },
    { message: language.input.document.validation }
  )),

  email: Zod.any().refine((email: string) => {
    if (email.trim() === '') return true
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )) return true

    return false
  }, language.input.email.validation).optional().nullable(),
});
