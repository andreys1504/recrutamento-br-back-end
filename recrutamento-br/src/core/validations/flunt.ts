import { Notification } from '../notifications/notification';

export class Flunt {
  constructor(public notifications: Notification[] = []) {}

  get isValid(): boolean {
    return this.notifications.length === 0;
  }

  isRequired(value, key, message) {
    if (!value || value.length <= 0) {
      this.notifications.push(new Notification(key, message));
    }
  }

  hasMinLen = (value, min, key, message) => {
    if (!value || value.length < min) {
      this.notifications.push(new Notification(key, message));
    }
  };

  hasMaxLen = (value, max, key, message) => {
    if (!value || value.length > max) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isFixedLen = (value, len, key, message) => {
    if (value.length !== len) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isEmail = (value, key, message) => {
    if (this.isNullOrUndefined(value)) { 
        return;
    }

    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isNotNull = (value, key, message) => {
    if (value === null || value === undefined) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isNotNullOrEmpty = (value: string, key, message) => {
    if(this.isNullOrUndefined(value)) {
        this.notifications.push(new Notification(key, message));
        return;
    }

    value = value.trim();
    if (!value.length) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isGreaterThan = (valuea, valueb, key, message) => {
    if (valuea > valueb) {
      this.notifications.push(new Notification(key, message));
    }
  };

  clear() {
    this.notifications = [];
  }

  private isNullOrUndefined(value: any) {
    if (value === null || value === undefined) { 
        return true;
    }

    return false;
  }
}
