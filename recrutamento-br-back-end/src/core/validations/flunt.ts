import { Notification } from '../notifications/notification';

export class Flunt {
  constructor(public notifications: Notification[] = []) {}

  get isValid(): boolean {
    return this.notifications.length === 0;
  }

  hasMinLen = (value, min, key, message) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length < min) {
      this.notifications.push(new Notification(key, message));
    }
  };

  hasMaxLen = (value, max, key, message) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length > max) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isFixedLen = (value, len, key, message) => {
    if(this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }
    
    if (value.length !== len) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isEmail = (value, key, message) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
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
    if (this.isNullOrUndefined(value)) {
      this.notifications.push(new Notification(key, message));
      return;
    }

    value = value.trim();
    if (!value.length) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isGreaterThan = (valuea, valueb, key, message) => {
    if (this.isNullOrUndefinedOrEmpty(valuea) || this.isNullOrUndefinedOrEmpty(valueb)) {
      return;
    }

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

  private isNullOrUndefinedOrEmpty(value: any) {
    if (value === null || value === undefined || (typeof value === "string" && value.trim() === '')) {
      return true;
    }

    return false;
  }
}
