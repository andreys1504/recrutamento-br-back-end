import { SchemaOptions } from "mongoose";

export const schemaOptions: SchemaOptions = {
    toObject: {
        transform: function (_: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    toJSON: {
        transform: (_: any, ret: any): void => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    timestamps: true,
}
