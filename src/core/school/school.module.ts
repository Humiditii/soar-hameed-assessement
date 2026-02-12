import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { SchoolRepository } from './repository/school.repository';
import { School, SchoolSchema } from './schema/school.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    ],
    controllers: [SchoolController],
    providers: [SchoolService, SchoolRepository],
    exports: [SchoolService, SchoolRepository],
})
export class SchoolModule { }
