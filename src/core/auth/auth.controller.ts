import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../../common/decorator/public.decorator';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/interface/main.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @ApiBearerAuth('access-token')
    @Roles(Role.SUPERADMIN)
    @Post('register')
    @ApiOperation({ summary: 'Register a new user (Superadmin only)' })
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
