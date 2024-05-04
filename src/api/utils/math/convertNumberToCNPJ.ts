export function convertNumberToCNPJ(inputNumber: number) {
  let CNPJ: string = inputNumber.toString();

  if (CNPJ.length < 14) {
    const zerosToAppend = 14 - CNPJ.length;

    CNPJ = '0'.repeat(zerosToAppend) + CNPJ;
  }

  return CNPJ;
}
