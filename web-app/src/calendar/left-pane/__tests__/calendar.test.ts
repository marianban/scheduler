import { Calendar } from '../calendar';

it('it is initializes without crashing', () => {
  new Calendar();
});

it('returns 6 weeks for 1.1.2018', () => {
  const calendar = new Calendar(new Date(2018, 1, 1));
  expect(calendar.getWeeks().length).toBe(6);
});

it('for 1.1.2018 the first week has number 1 ', () => {
  const calendar = new Calendar(new Date(2018, 0, 1));
  expect(calendar.getWeeks()[0].num).toBe(1);
});

it('for 1.1.2018 the first week has 7 days ', () => {
  const calendar = new Calendar(new Date(2018, 0, 1));
  expect(calendar.getWeeks()[0].days.length).toBe(7);
});

const expectWeekToHaveBounds = (week, start, end) => {
  expect(week.days[0].date).toEqual(start);
  expect(week.days[6].date).toEqual(end);
};

test.each`
  date          | firstWeekNumber | firstWeekFirstDay | firstWeekLastDay | lastWeekFirstDay | lastWeekLastDay
  ${'2018-1-1'} | ${1}            | ${1}              | ${7}             | ${5}             | ${11}
  ${'2017-1-1'} | ${52}           | ${26}             | ${1}             | ${30}            | ${5}
`(
  'for $date the first week #$firstWeekNumber is from $firstWeekFirstDay to $firstWeekLastDay and the last week is from $lastWeekFirstDay to $lastWeekLastDay',
  ({
    date,
    firstWeekNumber,
    firstWeekFirstDay,
    firstWeekLastDay,
    lastWeekFirstDay,
    lastWeekLastDay
  }) => {
    const calendar = new Calendar(new Date(date));
    const firstWeek = calendar.getWeeks()[0];
    expect(firstWeek.num).toEqual(firstWeekNumber);
    expectWeekToHaveBounds(firstWeek, firstWeekFirstDay, firstWeekLastDay);
    const lastWeek = calendar.getWeeks()[5];
    expectWeekToHaveBounds(lastWeek, lastWeekFirstDay, lastWeekLastDay);
  }
);

it('for 1.2.2018 first week has number 1', () => {
  const calendar = new Calendar(new Date(2018, 1, 1));
  expect(calendar.getWeeks()[0].num).toBe(5);
});

it('each week has 7 days', () => {
  const calendar = new Calendar(new Date(2018, 1, 1));
  expect(
    calendar.getWeeks().every(week => week.days.length === 7)
  ).toBeTruthy();
});
