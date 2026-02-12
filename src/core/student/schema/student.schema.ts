import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    studentId: string;

    @Prop({ type: String, ref: 'School', required: true })
    schoolId: string;

    @Prop({ type: String, ref: 'Classroom', required: true })
    classroomId: string;

    @Prop({ type: MongooseSchema.Types.Mixed })
    profileInfo: any;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
