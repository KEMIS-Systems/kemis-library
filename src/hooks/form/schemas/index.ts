import * as Zod from 'zod';


// CREATE A GENERIC SCHEMA OBJECT
export const GeneralSchema = Zod.object({
  /** A regra de negócio foi implementada com base no "artigo" de souforce
   * @see https://souforce.cloud/regra-de-validacao-para-cpf-e-cnpj-no-salesforce/
   */
  document: Zod.optional(Zod.string().refine((value) => {

    const cleanValue = (value as string).replace(/[^\w\s]/gi, '')

    console.log('document@validation step', value, cleanValue, cleanValue.length)

    let isValidDocument = false

    switch (cleanValue.length) {
      case 11:
        const splitedDocument = cleanValue.split("")
        const splitedValueRaw = splitedDocument
        const weightsDigitCPF = [10, 9, 8, 7, 6, 5, 4, 3, 2]
        const weightsSecondDigitCPF = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

        // splitedValueRaw[splitedValueRaw.length - 2] = `${splitedValueRaw[splitedValueRaw.length - 2]}${splitedValueRaw[splitedValueRaw.length - 1]}`

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
          // console.log('Second Digit ~ weight', weightsSecondDigitCPF[i])
          // console.log('Second Digit ~ number', splitedValue[i])
          // @ts-ignore
          // console.log('Second Digit ~ calc', splitedValue[i] * weightsSecondDigitCPF[i])
          // console.log('Second Digit ~ result', multiplyToSecondDigit)


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

        // console.log('CPF splited', splitedValue)

        // console.log('CPF weigth 1 digit', weightsDigitCPF)
        // console.log('CPF weigth 2 digit', weightsSecondDigitCPF)

        // console.log('CPF splited with first digit', [...splitedValue, firstDigit])
        // console.log('CPF splited with second digit', [...splitedValue, secondDigit])
        // console.log('CPF splited with digits', [...splitedValue, firstDigit, secondDigit])

        // console.log('CPF multiplicacao x1', multiplyToFirstDigit)
        // console.log('CPF multiplicacao x2', multiplyToSecondDigit)

        // console.log('CPF first digit', firstDigit, splitedDocument[splitedDocument.length - 2])
        // console.log('CPF second digit', secondDigit, splitedDocument[splitedDocument.length - 1])

        console.log('CPF', firstDigit, secondDigit, isValidDocument)

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

        // console.log('CNPJ splited', splitedDocumentCNPJ)

        // console.log('CNPJ weigth 1 digit', weightsFirstDigit)
        // console.log('CNPJ weigth 2 digit', weightsSecondDigit)

        // console.log('CNPJ splited with first digit', [...splitedDocumentCNPJ, firstDigitCNPJ])
        // console.log('CNPJ splited with second digit', [...splitedDocumentCNPJ, secondDigitCNPJ])
        // console.log('CNPJ splited with digits', [...splitedDocumentCNPJ, firstDigitCNPJ, secondDigitCNPJ])

        // console.log('CNPJ multiplicacao x1', multiplyToFirstDigitCNPJ)
        // console.log('CNPJ multiplicacao x2', multiplyToSecondDigitCNPJ)

        // console.log('CNPJ first digit', firstDigitCNPJ, splitedDocumentCNPJ[splitedDocumentCNPJ.length - 2])
        // console.log('CNPJ second digit', secondDigitCNPJ, splitedDocumentCNPJ[splitedDocumentCNPJ.length - 1])

        console.log('CNPJ', firstDigitCNPJ, secondDigitCNPJ, isValidDocument)

        break;
      default:
        isValidDocument = true
    }

    console.log('document@validation finish', isValidDocument)

    return isValidDocument

  },
    { message: "O documento está inválido" }
  )),

  email: Zod.optional(Zod.string().trim().email("Seu e-mail não é válido")),
});
