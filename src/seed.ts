import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './core/auth/auth.service';
import { Role } from './common/interface/main.interface';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const authService = app.get(AuthService);

    console.log('Seeding superadmin...');
    try {
        await authService.register({
            name: 'Super Admin',
            email: 'admin@school.com',
            password: 'password123',
            role: Role.SUPERADMIN,
        });
        console.log('Superadmin created: admin@school.com / password123');
    } catch (e) {
        console.log('Superadmin already exists or error occurred:', e.message);
    }

    await app.close();
}

seed();
