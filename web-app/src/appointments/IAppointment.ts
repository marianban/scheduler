export interface IAppointment {
  id: string;
  clientId?: string;
  dateTime: Date;
  duration: number;
  createdAt: Date;
}
