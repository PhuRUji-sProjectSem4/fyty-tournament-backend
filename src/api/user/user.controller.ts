import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Subject } from 'src/common/subject.decorator';
import { AddUserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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

    
    @Get("me")
    @UseGuards(JwtAuthGuard)
    async getMe(@Subject() subject: User): Promise<User>{
        return subject;
    }


    //@Put("me")
    
    @Post('register')
    async addUser(@Body() payload: AddUserDto): Promise<User> {
        return this.userService.addUser(payload);
    }
}
