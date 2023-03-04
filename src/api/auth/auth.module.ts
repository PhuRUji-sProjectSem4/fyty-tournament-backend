import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: env.JWT_SECRET_KEY,
            signOptions: { expiresIn: "10800s" }
        })],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, GoogleStrategy],
})
export class AuthModule { }
