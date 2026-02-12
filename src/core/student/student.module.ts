import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './repository/student.repository';
import { Student, StudentSchema } from './schema/student.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    ],
    controllers: [StudentController],
    providers: [StudentService, StudentRepository],
    exports: [StudentService, StudentRepository],
})
export class StudentModule { }
