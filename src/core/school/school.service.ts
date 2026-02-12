import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { SchoolRepository } from './repository/school.repository';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { appResponse } from '../../common/parser/appRespose.parser';

@Injectable()
export class SchoolService {
    constructor(
        private readonly schoolRepository: SchoolRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async create(createSchoolDto: CreateSchoolDto) {
        const school = await this.schoolRepository.create(createSchoolDto);
        await this.cacheManager.del('all_schools');
        return appResponse('School created successfully', school);
    }

    async findAll() {
        const cachedSchools = await this.cacheManager.get('all_schools');
        if (cachedSchools) {
            return appResponse('Schools retrieved successfully (cached)', cachedSchools);
        }

        const schools = await this.schoolRepository.search({}, undefined, undefined, { fetchAll: 'yes' });
        await this.cacheManager.set('all_schools', schools.documents, 3600); // 1 hour
        return appResponse('Schools retrieved successfully', schools.documents);
    }

    async findOne(id: string) {
        const school = await this.schoolRepository.findById(id);
        if (!school) {
            throw new NotFoundException('School not found');
        }
        return appResponse('School retrieved successfully', school);
    }

    async update(id: string, updateSchoolDto: UpdateSchoolDto) {
        const school = await this.schoolRepository.update(id, updateSchoolDto);
        if (!school) {
            throw new NotFoundException('School not found');
        }
        await this.cacheManager.del('all_schools');
        return appResponse('School updated successfully', school);
    }

    async remove(id: string) {
        await this.schoolRepository.delete(id);
        await this.cacheManager.del('all_schools');
        return appResponse('School deleted successfully');
    }
}
