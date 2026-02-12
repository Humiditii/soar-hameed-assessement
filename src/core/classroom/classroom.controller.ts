import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/interface/main.interface';

@ApiTags('Classrooms')
@ApiBearerAuth('access-token')
@Controller('classrooms')
export class ClassroomController {
    constructor(private readonly classroomService: ClassroomService) { }

    @Roles(Role.SCHOOL_ADMIN)
    @Post()
    @ApiOperation({ summary: 'Create a new classroom' })
    create(@Body() createClassroomDto: CreateClassroomDto) {
        return this.classroomService.create(createClassroomDto);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Get()
    @ApiOperation({ summary: 'Get all classrooms for a school' })
    findAll(@Req() req: any) {
        const schoolId = req.user.schoolId;
        return this.classroomService.findAll(schoolId);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'Get a classroom by id' })
    findOne(@Param('id') id: string) {
        return this.classroomService.findOne(id);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a classroom' })
    update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
        return this.classroomService.update(id, updateClassroomDto);
    }

    @Roles(Role.SCHOOL_ADMIN)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a classroom' })
    remove(@Param('id') id: string) {
        return this.classroomService.remove(id);
    }
}
