import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../common/baseRepository.repository';
import { School } from '../schema/school.schema';

@Injectable()
export class SchoolRepository extends BaseRepository<School> {
    constructor(@InjectModel(School.name) schoolModel: Model<School>) {
        super(schoolModel);
    }
}
