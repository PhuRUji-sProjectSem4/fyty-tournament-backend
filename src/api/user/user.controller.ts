import { Controller, Get, Put, Post, Body, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Subject } from 'src/common/subject.decorator';
import { AddUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getMe(@Subject() subject: User): Promise<User>{
        return subject;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.userService.getAllUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUser(@Param("id") userId: User['id']): Promise<User>{
        return this.userService.getUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put("me")
    async updateMe(
        @Subject() preUserData: User,
        @Body() payload: UpdateUserDto
    ) {
        return await this.userService.updateUser(preUserData, payload);
    }
    
    @Post('register')
    async addUser(@Body() payload: AddUserDto): Promise<User> {
        return this.userService.addUser(payload);
    }
}
