import { parseDate, toPrecision } from '../dateUtils';

it.only('should create date with specified precision', () => {
  const date = new Date(2018, 4, 10, 12, 12, 20, 300);
  console.log('hhhh');
  const preciseDate = toPrecision(date, 'days');
  expect(preciseDate).toMatchInlineSnapshot(`2018-10-20T18:48:42.255Z`);
});

it('should parse valid date', () => {
  const date = parseDate('22.12.2018');
  expect(date).toMatchInlineSnapshot(`2018-10-20T17:54:06.994Z`);
});
