import { Notifiable } from '../../../notifications/notifiable';

export abstract class RequestAppService extends Notifiable {
  abstract validate(): boolean;
}
