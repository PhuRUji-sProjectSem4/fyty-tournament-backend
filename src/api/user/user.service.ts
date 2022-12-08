import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { User } from '@prisma/client';
import { AddUserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUser(): Promise<User[]>{
        try{
            return await this.prisma.user.findMany();
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
    }

    async getUser(userId: User['id']): Promise<User>{
        try{
            return await this.prisma.user.findUniqueOrThrow({where: {id: userId}})
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }

    async addUser(payload: AddUserDto): Promise<User>{
        try{
            const hashedPassword = await bcrypt.hash(payload.password, 13);
            payload.password = hashedPassword;
            return await this.prisma.user.create({data: payload});
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
}

}
