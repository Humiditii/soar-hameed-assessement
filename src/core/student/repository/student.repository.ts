import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/baseRepository.repository';
import { Student } from '../schema/student.schema';

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
    constructor(@InjectModel(Student.name) studentModel: Model<Student>) {
        super(studentModel);
    }
}
