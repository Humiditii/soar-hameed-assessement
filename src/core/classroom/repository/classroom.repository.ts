import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/baseRepository.repository';
import { Classroom } from '../schema/classroom.schema';

@Injectable()
export class ClassroomRepository extends BaseRepository<Classroom> {
    constructor(@InjectModel(Classroom.name) classroomModel: Model<Classroom>) {
        super(classroomModel);
    }
}
