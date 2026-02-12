import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Classroom extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({ type: String, ref: 'School', required: true })
    schoolId: string;

    @Prop([String])
    resources: string[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
