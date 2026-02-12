import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassroomRepository } from './repository/classroom.repository';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { appResponse } from '../../common/parser/appRespose.parser';

@Injectable()
export class ClassroomService {
    constructor(private readonly classroomRepository: ClassroomRepository) { }

    async create(createClassroomDto: CreateClassroomDto) {
        const classroom = await this.classroomRepository.create(createClassroomDto);
        return appResponse('Classroom created successfully', classroom);
    }

    async findAll(schoolId?: string) {
        const filter = schoolId ? { schoolId } : {};
        const classrooms = await this.classroomRepository.search(filter, undefined, undefined, { fetchAll: 'yes' });
        return appResponse('Classrooms retrieved successfully', classrooms.documents);
    }

    async findOne(id: string) {
        const classroom = await this.classroomRepository.findById(id);
        if (!classroom) {
            throw new NotFoundException('Classroom not found');
        }
        return appResponse('Classroom retrieved successfully', classroom);
    }

    async update(id: string, updateClassroomDto: UpdateClassroomDto) {
        const classroom = await this.classroomRepository.update(id, updateClassroomDto);
        if (!classroom) {
            throw new NotFoundException('Classroom not found');
        }
        return appResponse('Classroom updated successfully', classroom);
    }

    async remove(id: string) {
        await this.classroomRepository.delete(id);
        return appResponse('Classroom deleted successfully');
    }
}
