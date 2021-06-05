import { Notification } from './notification';

export class Notifiable {
  private _notifications: Notification[] = new Array<Notification>();

  get notifications(): Notification[] {
    return this._notifications;
  }

  get isValid(): boolean {
    return this._notifications?.length === 0;
  }

  addNotification(key: string, message: string) {
    this._notifications.push(new Notification(key, message));
  }

  addNotifications(notifications: Notification[]) {
    if (notifications && notifications.length > 0)
      notifications.forEach((notification) =>
        this._notifications.push(notification),
      );
  }

  clear() {
    this._notifications = new Array<Notification>();
  }
}
