import { Md5 } from "md5-typescript";

export class CryptographyHelpers {
    static encryptPassword(data: string) {
        return Md5.init(`${data}${process.env.SECRET_PASSWORD}`);
    }
}