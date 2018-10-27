import { Day } from 'calendar/left-pane/Day';
import classNames from 'classnames';
import * as React from 'react';

interface ICalendarDayProps {
  day: Day;
  isSelected: boolean;
  onDaySelect: (day: Day) => void;
}

export class CalendarDay extends React.Component<ICalendarDayProps, {}> {
  public render() {
    const { day, isSelected } = this.props;
    return (
      <div
        className={classNames('calendar__week__day', {
          'calendar__day--today': day.isSameDayAs(new Date()),
          'calendar__day--selected': isSelected,
          'calendar__day--another-month': !day.isActiveMonth
        })}
        onClick={this.handleOnDayClick}
      >
        {day.num}
      </div>
    );
  }

  private handleOnDayClick = () => {
    const { onDaySelect, day } = this.props;
    onDaySelect(day);
  };
}
