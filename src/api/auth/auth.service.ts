import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from 'process';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async localLogin(username: User['username'], password: User['password']){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({where: { username: username }})
            const userInfo = await this.validateUser(user, password)
            
            return this.getAccessToken(userInfo.id);
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getUserById(id: User["id"]) {
        try{
            return await this.prisma.user.findUniqueOrThrow({ where: { id } });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
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

    private getAccessToken(id: User["id"]) {
        const payload = { sub: id };
        const accessToken = jwt.sign(payload, env.JWT_SECRET_KEY);    
    
        return { accessToken };
      }
}
