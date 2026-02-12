import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../common/interface/main.interface';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: Role })
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;

    @ApiProperty({ required: false })
    @IsOptional()
    schoolId?: string;
}
