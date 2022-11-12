import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async addUser(@Body() payload: AddUserDto): Promise<User> {
        return this.userService.addUser(payload);
    }
}
