import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return this.userService.getAllUser();
    }

    @Get(":id")
    async getUser(@Param("id") userId: User['id']): Promise<User>{
        return this.userService.getUser(userId);
    }

    @Post('register')
    async addUser(@Body() payload: AddUserDto): Promise<User> {
        return this.userService.addUser(payload);
    }
}
