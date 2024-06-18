/**
 * Função para calcular o tempo em minutos entre duas datas
 * @param {Date} firstDate - A primeira data
 * @param {Date} secondDate - A segunda data
 * @returns {number} - O tempo em minutos entre as duas datas
 */
export function getMinutesBetweenDates(firstDate: Date, secondDate: Date) {
  // Converter as datas em milissegundos
  const firstTime = new Date(firstDate).getTime();
  const secondTime = new Date(secondDate).getTime();

  const diffInMilliseconds = Math.abs(secondTime - firstTime);

  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));

  return diffInMinutes;
}
