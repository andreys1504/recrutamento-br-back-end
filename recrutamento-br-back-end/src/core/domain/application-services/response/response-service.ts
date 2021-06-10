import { Notification } from '../../../notifications/notification';

export class ResponseServiceModel<TData> {
  constructor(
    public success: boolean,
    public data: TData,
    public notifications: Notification[],
  ) {}
}
