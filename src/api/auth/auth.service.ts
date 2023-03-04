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
            const user = await this.prisma.user.findUniqueOrThrow({where: { username: username }});
            const userInfo = await this.validateUser(user, password);
            const accessToken = this.getAccessToken(userInfo.id);

            const userToken =  {...userInfo, ...accessToken};

            return userToken;
            
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async oAuthLogin(user: any) {
        try {
            if(!user){
                throw new Error("No User Found")
            }
    
            const userData = await this.prisma.user.findUnique({ 
                where: { 
                    email: user.email 
                } 
            });

            if (userData !== null) {
                const accessToken = this.getAccessToken(userData.id);
                return {...userData, ...accessToken};
            } 
            else {
                const {password, ...userInfo} = await this.oAuthRegister(user);
                const accessToken = this.getAccessToken(userInfo.id);
                return {...userInfo, ...accessToken};
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    private async oAuthRegister(userData: any):Promise<User> {
        try{
            const password = await bcrypt.hash(userData.username, 7)
            return await this.prisma.user.create({
                data:{
                    username: (userData.username),
                    email: userData.email,
                    password: password,
                    coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275",
                    protraitUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275"
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
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
                return await result
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
