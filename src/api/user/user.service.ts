import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { Role, User } from '@prisma/client';
import { AddUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';
import { userDummy } from 'src/dummy/user-dummy';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllUser(): Promise<User[]>{
        try{
            return await this.prisma.user.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
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
            return await this.prisma.user.create({
                data: {
                    ...payload,
                    coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275",
                    protraitUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275"
                } 
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async updateUser(preUserData: User, payload: UpdateUserDto): Promise<User>{
        try{
            return await this.prisma.user.update({
                where:{
                    id: preUserData.id
                },
                data: payload
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async initUser(): Promise<void>{
        try{
            const users = userDummy;
            for(let user=0; user<userDummy.length; user++){
                let userData = users[user];
                const hashedPassword = await bcrypt.hash(userData.password, 13);
                userData.password = hashedPassword;
                await this.prisma.user.create({
                    data: userData
                })
            }
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async updatePic(): Promise<any>{
        try{
            return this.prisma.user.updateMany({
                data:{
                    coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275",
                    protraitUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275"
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getSchedule(user: User): Promise<any[]>{
        try{
            const teamMembers = await this.prisma.teamMember.findMany({
                where:{
                    userId: user.id,
                    role: (
                        Role.COACH, 
                        Role.MANAGER, 
                        Role.PLAYER
                    )
                }
            })

            let getAllMatchs = []

            for(let team=0; team < teamMembers.length; team++){
                const matchs = await this.prisma.match.findMany({
                    where:{
                        OR: [
                            {
                                teamHomeId: teamMembers[team].teamId
                            },
                            {
                                teamAwayId: teamMembers[team].teamId
                            }
                        ]
                    }
                })

                getAllMatchs.push(...matchs)
            }


            return getAllMatchs
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
