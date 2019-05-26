import format from "date-fns/format";
import parse from "date-fns/parse";

type Precision =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "days"
  | "month"
  | "year";

const getArg = (args: number[], index: number) => args[index] || 0;

export const toPrecision = (date: Date, precision: Precision) => {
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
  const args = parts.slice(0, end);
  return new Date(
    getArg(args, 0),
    getArg(args, 1),
    getArg(args, 2),
    getArg(args, 3),
    getArg(args, 4),
    getArg(args, 5),
    getArg(args, 6)
  );
};

export const parseDate = (value: string, baseDate: Date = new Date()) => {
  const matches = value.match(/(\d+)[\.\-\/]?(\d*)[\.\-\/]?(\d*)/);
  if (!matches) {
    throw new Error(`Unable to parse date: ${value}`);
  }
  const [day, month, year] = matches.slice(1);
  const date = `${day}${month && "."}${month}${year && "."}${year}`;
  const pattern = `dd${month && ".MM"}${year && ".yyyy"}`;
  return parse(date, pattern, toPrecision(baseDate, "days"));
};

export const normalizeDate = (value: string, baseDate: Date) => {
  return format(parseDate(value, baseDate), "d/M/yyyy");
};

export const normalizeTime = (value: string) => {
  const matches = value.match(/(\d+):?(\d+)?/);
  if (!matches) {
    throw new Error(`Unable to parse time: ${value}`);
  }
  const [hour, minute] = matches.slice(1);
  return `${hour}:${minute || "00"}`;
};
