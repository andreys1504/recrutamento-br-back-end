//SchemaOptions
export const schemaOptions = {
    toJSON: {
        transform: (_: any, ret: any): void => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
    timestamps: true,
}
