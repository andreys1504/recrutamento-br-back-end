import { Notifiable } from "../../../../core/notifications/notifiable";

export abstract class RequestService extends Notifiable {
    abstract validate(): boolean;
}
