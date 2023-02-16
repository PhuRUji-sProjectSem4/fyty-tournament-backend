import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { TournamentJoined, TourStatus, User } from '@prisma/client';
import { AddTournamentJoinDto } from 'src/dto/tournament.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JoinedService {
    constructor(private readonly prisma: PrismaService){}

    async joinTournament(sender: User["id"], payload: AddTournamentJoinDto): Promise<TournamentJoined>{
        try{
            const tournament = await this.prisma.tournament.findUniqueOrThrow({
                where:{
                    id: payload.tourId
                }
            });

            const team = await this.prisma.team.findUniqueOrThrow({
                where:{
                    id: payload.teamId
                }
            });
            
            const game = await this.prisma.game.findUniqueOrThrow({
                where:{
                    id: tournament.gameId
                }
            });

            if(team.ownerId !== sender)
                throw new BadRequestException("You are not a tean owner.")
            if(team.gameId !== tournament.gameId)
                throw new BadRequestException("Your team is wrong game for this tournament.");
            if(tournament.currentJoin + 1 > tournament.tourCap)
                throw new BadRequestException("Tournament is full.");
            if(tournament.status != TourStatus.REGISTER) 
                throw new BadRequestException("Tournament is close for register.");
            if(team.currentMember < game.lineUpCap) 
                throw new BadRequestException("Not enough team member.")
            if(tournament.currentJoin + 1 <= tournament.tourCap && tournament.status == TourStatus.REGISTER && team.gameId === tournament.gameId && team.currentMember >= game.lineUpCap){
                const joiner = await this.prisma.tournamentJoined.create({
                    data: payload
                });

                const incrementTour = await this.prisma.tournament.update({
                    where:{
                        id: joiner.tourId
                    },
                    data:{
                        currentJoin: {
                            increment: 1
                        }
                    }
                });

                return joiner
            }
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getAllTournamentJoin():Promise<TournamentJoined[]>{
        try{
            return await this.prisma.tournamentJoined.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTournamentJoin(tourId: TournamentJoined["tourId"]):Promise<TournamentJoined[]>{
        try{
            const joinTeam = await this.prisma.tournamentJoined.findMany({
                where:{
                    tourId: tourId
                }
            });

            let teams = []

            for(let team=0; team < joinTeam.length; team++){
                const teamJoin = await this.prisma.team.findUniqueOrThrow({
                    where:{
                        id: joinTeam[team].teamId
                    }
                }); 

                teams.push({...joinTeam[team] ,teamJoin})
            }

            return teams
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTournamentJoinEach(joinId: TournamentJoined["id"]):Promise<TournamentJoined>{
        try{
            return await this.prisma.tournamentJoined.findUniqueOrThrow({
                where:{
                    id: joinId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    
}
