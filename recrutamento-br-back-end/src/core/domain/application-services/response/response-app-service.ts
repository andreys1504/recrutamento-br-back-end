import { Notification } from '../../../notifications/notification';

export class ResponseAppService<TData> {
  constructor(
    public success: boolean,
    public data: TData,
    public notifications: Notification[],
  ) {}
}
