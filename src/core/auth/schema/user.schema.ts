import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../common/interface/main.interface';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role })
    role: Role;

    @Prop({ type: String, ref: 'School' })
    schoolId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
