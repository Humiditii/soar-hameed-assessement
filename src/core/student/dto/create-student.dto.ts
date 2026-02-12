import { IsEmail, IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    studentId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    schoolId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    classroomId: string;

    @ApiProperty({ required: false })
    @IsObject()
    @IsOptional()
    profileInfo?: any;
}
