import { parse } from 'date-fns';
import { normalizeTime, parseDate, toPrecision } from '../dateTimeUtils';

it('date fns parse example', () => {
  expect(parse('10.12.2018', 'dd.MM.yyyy', new Date())).toMatchInlineSnapshot(
    `2018-12-09T23:00:00.000Z`
  );
});

it('should create date with specified precision', () => {
  const date = new Date(2018, 4, 10, 12, 12, 20, 300);
  const preciseDate = toPrecision(date, 'days');
  expect(preciseDate.getTime()).toMatchInlineSnapshot(`1525903200000`);
});

const expectDate = (date: Date, day: number, month: number, year: number) => {
  expect(date.getDate()).toBe(day);
  expect(date.getMonth()).toBe(month - 1);
  expect(date.getFullYear()).toBe(year);
};

it.each`
  date            | day   | month | year
  ${'22.12.2018'} | ${22} | ${12} | ${2018}
  ${'22/12/2018'} | ${22} | ${12} | ${2018}
  ${'22-12-2018'} | ${22} | ${12} | ${2018}
  ${'22.12.'}     | ${22} | ${12} | ${2018}
  ${'22.12'}      | ${22} | ${12} | ${2018}
  ${'22.'}        | ${22} | ${9}  | ${2018}
  ${'22'}         | ${22} | ${9}  | ${2018}
`(
  'for $date returns day: $day, month: $month, year: $year',
  ({ date, day, month, year }) => {
    const baseDate = new Date(2018, 8, 22);
    const resultDate = parseDate(date, baseDate);
    expectDate(resultDate, day, month, year);
  }
);

it('should normalize incomplete time', () => {
  const time = normalizeTime('11');
  expect(time).toBe('11:00');
});

it('should normalize incomplete time', () => {
  const time = normalizeTime('11:');
  expect(time).toBe('11:00');
});

it('should keep correct time', () => {
  const time = normalizeTime('11:15');
  expect(time).toBe('11:15');
});
