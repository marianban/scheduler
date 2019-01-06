import classNames from 'classnames';
import format from 'date-fns/format/index';
import React from 'react';
import { ReactComponent as CalendarPlusIcon } from './calendar-plus-regular.svg';
import './WorkCalendarCell.css';

interface IWorkCalendarCellProps {
  column: number;
  row: number;
  date: Date;
  onCreateNewAppointment: (date: Date) => void;
  onAppointmentMoved: (date: Date, appointmentId: string) => void;
}

interface IWorkCalendarCellState {
  isActiveDropZone: boolean;
}

export class WorkCalendarCell extends React.PureComponent<
  IWorkCalendarCellProps,
  IWorkCalendarCellState
> {
  public readonly state: IWorkCalendarCellState = { isActiveDropZone: false };

  public render() {
    const { column, row, date } = this.props;
    return (
      <div
        className={classNames('work-calendar__week__day', {
          'work-calendar__week__day--last': column === 6,
          'work-calendar__drop-zone--active': this.state.isActiveDropZone
        })}
        style={{
          gridColumn: column + 2,
          gridRow: row + 2
        }}
        data-testid={format(date, 'd/M/yyyy HH:mm')}
        onDragOver={this.handleOnDragOver}
        onDragLeave={this.handleOnDragLeave}
        onDrop={this.handleOnDrop}
      >
        <div title="Click to create an appointment here">
          <CalendarPlusIcon
            width="20"
            className="appointment__icon"
            data-testid="calendar-create-appointment"
            onClick={this.handleOnCreateNewAppointment}
          />
        </div>
      </div>
    );
  }

  private handleOnCreateNewAppointment = () => {
    const { date, onCreateNewAppointment } = this.props;
    onCreateNewAppointment(date);
  };

  private handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    this.setState({
      isActiveDropZone: true
    });
  };

  private handleOnDragLeave = () => {
    this.setState({
      isActiveDropZone: false
    });
  };

  private handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    this.setState({
      isActiveDropZone: false
    });
    const { onAppointmentMoved, date } = this.props;
    onAppointmentMoved(date, event.dataTransfer.getData('text/plain'));
  };
}
