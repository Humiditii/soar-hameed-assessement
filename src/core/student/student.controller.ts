import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/interface/main.interface';

@ApiTags('Students')
@ApiBearerAuth('access-token')
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Roles(Role.SCHOOL_ADMIN)
    @Post()
    @ApiOperation({ summary: 'Enroll a new student' })
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Get()
    @ApiOperation({ summary: 'Get all students for the admin\'s school' })
    findAll(@Req() req: any) {
        const schoolId = req.user.schoolId;
        return this.studentService.findAll(schoolId);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'Get a student by id' })
    findOne(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a student profile' })
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.update(id, updateStudentDto);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a student record' })
    remove(@Param('id') id: string) {
        return this.studentService.remove(id);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Patch(':id/transfer/:classroomId')
    @ApiOperation({ summary: 'Transfer student to another classroom' })
    transfer(@Param('id') id: string, @Param('classroomId') classroomId: string) {
        return this.studentService.transfer(id, classroomId);
    }
}
