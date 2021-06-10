import { Guid } from "guid-typescript";

export class GuidHelpers {
    static create() {
        return Guid.create().toString();
    }
}