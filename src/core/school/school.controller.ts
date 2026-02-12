import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/interface/main.interface';

@ApiTags('Schools')
@ApiBearerAuth('access-token')
@Controller('schools')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Roles(Role.SUPERADMIN)
    @Post()
    @ApiOperation({ summary: 'Create a new school' })
    create(@Body() createSchoolDto: CreateSchoolDto) {
        return this.schoolService.create(createSchoolDto);
    }

    @Roles(Role.SUPERADMIN)
    @Get()
    @ApiOperation({ summary: 'Get all schools' })
    findAll() {
        return this.schoolService.findAll();
    }

    @Roles(Role.SUPERADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'Get a school by id' })
    findOne(@Param('id') id: string) {
        return this.schoolService.findOne(id);
    }

    @Roles(Role.SUPERADMIN)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a school' })
    update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
        return this.schoolService.update(id, updateSchoolDto);
    }

    @Roles(Role.SUPERADMIN)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a school' })
    remove(@Param('id') id: string) {
        return this.schoolService.remove(id);
    }
}
