import { Notification } from './notification';

export class Notifiable {
  private notifications: Notification[] = new Array<Notification>();

  get getNotifications(): Notification[] {
    return this.notifications;
  }

  get isValid(): boolean {
    return this.notifications?.length === 0;
  }

  addNotification(key: string, message: string) {
    this.notifications.push(new Notification(key, message));
  }

  addNotifications(notifications: Notification[]) {
    if (notifications?.length > 0) {
      notifications.forEach((notification) =>
        this.notifications.push(notification),
      );
    }
  }

  clear() {
    this.notifications = new Array<Notification>();
  }
}
