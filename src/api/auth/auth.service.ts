import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async localLogin(username: User['username'], password: User['password']){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({where: { username: username }})
            const userInfo = await this.validateUser(user, password)
            return userInfo
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getUserById(id: User["id"]) {
        return await this.prisma.user.findUniqueOrThrow({ where: { id } });
    }

    private async validateUser(user: User, password: User['password']){
        try{
            if( user && bcrypt.compareSync(password, user.password)){
                const {password, ...result} = user
                return result
            }
        }
        catch(error){
            throw new BadRequestException("incorrect username or password");
        }   
    }

}
