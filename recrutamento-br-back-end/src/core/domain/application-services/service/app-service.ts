import { RequestService } from '../request/request-service';
import { ResponseServiceModel } from '../response/response-service';
import { Notification } from '../../../../core/notifications/notification';

export abstract class AppService<TDataResponse> {
  abstract handleAsync(
    request: RequestService,
  ): Promise<ResponseServiceModel<TDataResponse>>;

  returnNotification(key: string, message: string) {
    const notifications = new Array<Notification>();
    notifications.push(new Notification(key, message));

    return new ResponseServiceModel(false, null, notifications);
  }

  returnNotifications(notifications: Notification[]) {
    return new ResponseServiceModel(false, null, notifications);
  }

  returnData(data: TDataResponse) {
    return new ResponseServiceModel(true, data, null);
  }

  returnSuccess() {
    return new ResponseServiceModel(true, null, null);
  }
}
