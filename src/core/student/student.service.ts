import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from './repository/student.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { appResponse } from '../../common/parser/appRespose.parser';

@Injectable()
export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) { }

    async create(createStudentDto: CreateStudentDto) {
        const student = await this.studentRepository.create(createStudentDto);
        return appResponse('Student enrolled successfully', student);
    }

    async findAll(schoolId?: string, classroomId?: string) {
        const filter: any = {};
        if (schoolId) filter.schoolId = schoolId;
        if (classroomId) filter.classroomId = classroomId;

        const students = await this.studentRepository.search(filter, undefined, undefined, { fetchAll: 'yes' });
        return appResponse('Students retrieved successfully', students.documents);
    }

    async findOne(id: string) {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return appResponse('Student retrieved successfully', student);
    }

    async update(id: string, updateStudentDto: UpdateStudentDto) {
        const student = await this.studentRepository.update(id, updateStudentDto);
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return appResponse('Student updated successfully', student);
    }

    async remove(id: string) {
        await this.studentRepository.delete(id);
        return appResponse('Student deleted successfully');
    }

    async transfer(id: string, targetClassroomId: string) {
        const student = await this.studentRepository.update(id, { classroomId: targetClassroomId });
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return appResponse('Student transferred successfully', student);
    }
}
