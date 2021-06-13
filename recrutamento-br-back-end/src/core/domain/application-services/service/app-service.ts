import { RequestAppService } from '../request/request-app-service';
import { ResponseAppService } from '../response/response-app-service';
import { Notification } from '../../../../core/notifications/notification';

export abstract class AppService<TDataResponse> {
  abstract handleAsync(
    request: RequestAppService,
  ): Promise<ResponseAppService<TDataResponse>>;

  protected returnNotification(key: string, message: string) {
    const notifications = new Array<Notification>();
    notifications.push(new Notification(key, message));

    return new ResponseAppService(false, null, notifications);
  }

  protected returnNotifications(notifications: Notification[]) {
    return new ResponseAppService(false, null, notifications);
  }

  protected returnData(data: TDataResponse) {
    return new ResponseAppService(true, data, null);
  }

  protected returnSuccess() {
    return new ResponseAppService(true, null, null);
  }
}
