import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { appResponse } from '../../common/parser/appRespose.parser';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const user: any = await this.userRepository.findOne({ email: loginDto.email });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            userId: user._id,
            email: user.email,
            userRole: user.role,
            schoolId: user.schoolId
        };

        return appResponse('Login successful', {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                schoolId: user.schoolId
            }
        });
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ email: registerDto.email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
        });

        return appResponse('User registered successfully', {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
}
