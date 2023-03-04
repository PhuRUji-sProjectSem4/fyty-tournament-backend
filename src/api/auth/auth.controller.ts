import { Controller, Get, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login')
    async login(
        @Query('username') username: string,
        @Query('password') password: string
    ){
        return await this.authService.localLogin(username, password);
    }

    @UseGuards(AuthGuard("google"))
    @Get("google")
    async googleLogin() {
        return HttpStatus.OK;
    }

    @UseGuards(AuthGuard("google"))
    @Get("login/google/callback")
    async googleAuth(@Req() req: Request){
        return await this.authService.oAuthLogin(req.user);
    }
}
