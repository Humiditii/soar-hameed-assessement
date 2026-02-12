import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { ClassroomRepository } from './repository/classroom.repository';
import { Classroom, ClassroomSchema } from './schema/classroom.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Classroom.name, schema: ClassroomSchema }]),
    ],
    controllers: [ClassroomController],
    providers: [ClassroomService, ClassroomRepository],
    exports: [ClassroomService, ClassroomRepository],
})
export class ClassroomModule { }
