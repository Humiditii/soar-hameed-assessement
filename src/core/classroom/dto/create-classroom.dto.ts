import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    schoolId: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsOptional()
    resources?: string[];
}
