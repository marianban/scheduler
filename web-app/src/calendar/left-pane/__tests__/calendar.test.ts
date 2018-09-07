import { DateCalendar } from '../DateCalendar';
import { Week } from '../Week';

it('it is initializes without crashing', () => {
    const calendar = new DateCalendar(new Date());
    expect(calendar).toBeDefined();
});

it('returns 6 weeks for 1.1.2018', () => {
  const calendar = new DateCalendar(new Date(2018, 0, 1));
  expect(calendar.getWeeks().length).toBe(6);
});

it('first week in calendar for 1.1.2018 is in current month', () => {
  const calendar = new DateCalendar(new Date(2018, 0, 1));
  const weeks = calendar.getWeeks()
  expect(weeks[0].days.every(day => day.isActiveMonth)).toBeTruthy();
  expect(weeks[weeks.length - 1].days.every(day => day.isActiveMonth)).toBeFalsy();
});

it('for 1.1.2018 the first week has number 1 ', () => {
  const calendar = new DateCalendar(new Date(2018, 0, 1));
  expect(calendar.getWeeks()[0].num).toBe(1);
});

it('for 1.1.2018 the first week has 7 days ', () => {
  const calendar = new DateCalendar(new Date(2018, 0, 1));
  expect(calendar.getWeeks()[0].days.length).toBe(7);
});

const expectWeekToHaveBounds = (week: Week, start: number, end: number) => {
  expect(week.days[0].num).toEqual(start);
  expect(week.days[6].num).toEqual(end);
};

it.each`
  date            | firstWeekNumber | firstWeekFirstDay | firstWeekLastDay | lastWeekFirstDay | lastWeekLastDay | weekNumbering
  ${'2018-1-1'}   | ${1}            | ${1}              | ${7}             | ${5}             | ${11}           | ${'iso'}
  ${'2017-1-1'}   | ${52}           | ${26}             | ${1}             | ${30}            | ${5}            | ${'iso'}
  ${'2009-12-1'}  | ${49}           | ${30}             | ${6}             | ${4}             | ${10}           | ${'iso'}
  ${'2018-1-1'}   | ${1}            | ${31}             | ${6}             | ${4}             | ${10}           | ${'us'}
  ${'2017-1-1'}   | ${1}            | ${1}              | ${7}             | ${5}             | ${11}           | ${'us'}
  ${'2009-12-1'}  | ${49}           | ${29}             | ${5}             | ${3}             | ${9}            | ${'us'}
`(
  'for $date the first week #$firstWeekNumber is from $firstWeekFirstDay to $firstWeekLastDay and the last week is from $lastWeekFirstDay to $lastWeekLastDay',
  ({
    date,
    firstWeekNumber,
    firstWeekFirstDay,
    firstWeekLastDay,
    lastWeekFirstDay,
    lastWeekLastDay,
    weekNumbering,
  }) => {
    const calendar = new DateCalendar(new Date(date), weekNumbering);
    const firstWeek = calendar.getWeeks()[0];
    expect(firstWeek.num).toEqual(firstWeekNumber);
    expectWeekToHaveBounds(firstWeek, firstWeekFirstDay, firstWeekLastDay);
    const lastWeek = calendar.getWeeks()[5];
    expectWeekToHaveBounds(lastWeek, lastWeekFirstDay, lastWeekLastDay);
  }
);

it('for 1.2.2018 first week has number 1', () => {
  const calendar = new DateCalendar(new Date(2018, 1, 1));
  expect(calendar.getWeeks()[0].num).toBe(5);
});

it('each week has 7 days', () => {
  const calendar = new DateCalendar(new Date(2018, 1, 1));
  expect(
    calendar.getWeeks().every(week => week.days.length === 7)
  ).toBeTruthy();
});
