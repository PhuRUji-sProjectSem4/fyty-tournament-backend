import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Match, Tournament, TournamentJoined, TourStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatchService {
    constructor(private readonly prisma: PrismaService) { }

    async initMatch(tourId: Tournament["id"], date: Match["date"]): Promise<any> {
        try {
            const tour = await this.prisma.tournament.findUniqueOrThrow({
                where:{
                    id: tourId
                }
            });

            if(tour.status != TourStatus.STARTED){
                throw new BadRequestException("Tournament is not start")
            }
            
            const tourJoined = await this.prisma.tournamentJoined.findMany({
                where: {
                    id: tourId
                }
            });

            const randList = await this.randomList(tourJoined);

            let homeTeam = randList.slice(0,3);
            let awayTeam = randList.slice(4,7);

            let match = [];

            for(let matchCount = 0; matchCount < homeTeam.length; matchCount++){
                match.push({
                    tourId: tourId, 
                    date: date, 
                    round: "1", 
                    pair: matchCount+1,
                    teamHomeId: homeTeam[matchCount],
                    awayTeam: awayTeam[matchCount] 
                })
            }

            const createMatch = await this.prisma.match.createMany({
                data: match
            })
            

            return createMatch
        }
        catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    private async randomList(tourJoin: TournamentJoined[]) {
        try {
            let join = tourJoin;
            let randList = [];

            while (join.length != 0) {
                let rand = Math.floor(Math.random() * join.length);
                randList.push(join[rand]);
                join.splice(rand, 1)
            };

            return randList;
        }
        catch (error) {
            throw new error.message
        }
    }
}
