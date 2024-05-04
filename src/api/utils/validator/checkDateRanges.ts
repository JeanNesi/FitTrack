import { ErrorMessage } from '../error';

interface ICheckDateRanges {
  startDate: string | undefined;
  endDate: string | undefined;
  label: string;
  allowEquals?: boolean;
}

export function checkDateRanges(data: ICheckDateRanges[]) {
  data.forEach(({ startDate, endDate, label, allowEquals = true }) => {
    if (!allowEquals && startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A ${label} inicial deve ser maior ou igual a ${label} final.`,
      });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A ${label} inicial deve ser maior que a ${label} final.`,
      });
    }
  });
}
