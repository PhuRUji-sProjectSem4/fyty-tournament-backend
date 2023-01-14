import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Tournament, TournamentRank } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RankService {
    constructor(private readonly prisma: PrismaService){}

    async getAllRank(): Promise<TournamentRank[]>{
        try{
            return await this.prisma.tournamentRank.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async gettournametRank(tourId: Tournament["id"]): Promise<TournamentRank[]>{
        try{
            return await this.prisma.tournamentRank.findMany({
                where:{
                    tourId: tourId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getRankeach(rankId: TournamentRank["id"]): Promise<TournamentRank>{
        try{
            return await this.prisma.tournamentRank.findUniqueOrThrow({
                where:{
                    id: rankId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
