import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AddUserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async addUser(payload: AddUserDto): Promise<User>{
        try{
            return await this.prisma.user.create({data: payload});
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
}

}
