import { WeekNumbering } from 'calendar/WeekNumbering'

const weekDay = (
  twoLetterName: string,
  threeLetterName: string,
  name: string
) => ({
  twoLetterName,
  threeLetterName,
  name
});

export const getWeekDays = (weekNumberingStyle: WeekNumbering) => {
  const weekDays = [
    weekDay('Mo', 'Mon', 'Monday'),
    weekDay('Tu', 'Tue', 'Tuesday'),
    weekDay('We', 'Wed', 'Wednesday'),
    weekDay('Th', 'Thu', 'Thursday'),
    weekDay('Fi', 'Fri', 'Friday'),
    weekDay('Sa', 'Sat', 'Saturday'),
    weekDay('Su', 'Sun', 'Sunday')
  ];
  switch (weekNumberingStyle) {
    case WeekNumbering.ISO:
      return weekDays;
    case WeekNumbering.NorthAmerican: 
      const firstDay = weekDays.pop();
      weekDays.splice(0, 0, firstDay!);
      return weekDays;
  }
};
