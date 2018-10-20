import { parse } from 'date-fns';

type Precision =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'days'
  | 'month'
  | 'year';

export const toPrecision = (date: Date, precision: Precision) => {
  console.log('to precision');
  const precisionMap = {
    milliseconds: 7,
    seconds: 6,
    minutes: 5,
    hours: 4,
    days: 3,
    month: 2,
    year: 1
  };
  const parts = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ];
  const end = precisionMap[precision];
  return new Function.prototype.bind.apply(
    Date,
    ...[null].concat(parts.slice(0, end))
  );
};

export const parseDate = (value: string, baseDate: Date = new Date()) => {
  const matches = value.match(/(\d+)[\.\-\/](\d+)[\.\-\/](\d+)/);
  if (!matches) {
    throw new Error(`Unable to parse: ${value}`);
  }
  const [day, month, year] = matches.slice(1);
  return parse(value, `${day}.${month}.${year}`, toPrecision(baseDate, 'days'));
};
