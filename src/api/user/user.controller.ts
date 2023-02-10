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
    @Get(":id/team")
    async getUserTeam(@Param("id")  userId: User["id"]): Promise<any[]>{
        return await this.userService.getUserTeam(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("tournamet/me")
    async getTourByUser(@Subject() user: User): Promise<any[]>{
        return await this.userService.getUserTour(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/history/")
    async getHistory(@Param("id")  userId: User["id"]): Promise<any[]>{
        return await this.userService.getHistorys(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get("schedule/me")
    async getSchedule(@Subject() user: User): Promise<any[]>{
        return await this.userService.getSchedule(user);
    }

    @Put("pic")
    async changePic(){
        return await this.userService.updatePic();
    }

    @Post("init")
    async initUser(): Promise<void>{
        return await this.userService.initUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getMe(@Subject() subject: User): Promise<User>{
        return await subject;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers(): Promise<User[]>{
        return await this.userService.getAllUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getUser(@Param("id") userId: User['id']): Promise<User>{
        return await this.userService.getUser(userId);
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
        return await this.userService.addUser(payload);
    }
}
