import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Match, MatchDetail, MatchResult, Team, Tournament, TournamentJoined, TourStatus, UploadStatus, WinningTeam } from '@prisma/client';
import { CreateMatchDto, CreateMatchResultDto, DateMatchDto, DetailImgUrl } from 'src/dto/tournament.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatchService {
    constructor(private readonly prisma: PrismaService) { }

    async initMatch(tourId: Tournament["id"], playTime: DateMatchDto): Promise<any> {
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
                    tourId: tourId
                }
            });

            const randList = await this.randomList(tourJoined);
            
            let homeTeam = randList.slice(0,4);
            let awayTeam = randList.slice(4,8);

            let createdData = null

            for(let matchCount = 0; matchCount < homeTeam.length; matchCount++){
                console.log("loop is going");
                
                createdData = await this.prisma.match.create({
                    data:{
                        tourId: tourId, 
                        date: playTime.date, 
                        round: "1", 
                        pair: String(matchCount+1),
                        teamHomeId: homeTeam[matchCount].teamId,
                        teamAwayId: awayTeam[matchCount].teamId
                    }
                })
            }
            
            return createdData
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

    async getAllMatch(): Promise<Match[]> {
        try{
            return await this.prisma.match.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTourMatch(tourId: Tournament["id"]): Promise<Match[]> {
        try{
            return await this.prisma.match.findMany({
                where:{
                    tourId: tourId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getMatchEach(matchId: Match["id"]): Promise<Match> {
        try{
            return await this.prisma.match.findUniqueOrThrow({
                where:{
                    id: matchId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async createMatch(payload: CreateMatchDto ):Promise<Match>{
        try{






            return await this.prisma.match.create({
                data: payload
            });
        } 
        catch(error){{
            throw new BadRequestException(error.message)
        }}
    }

    async scoreMatch(payload: CreateMatchResultDto): Promise<MatchResult>{
        try{
            let dataIn
            if(payload.teamHomeScore > payload.teamAwayScore && (payload.teamHomeScore + payload.teamAwayScore === 3)){
                dataIn = {...payload, winningTeam: WinningTeam.HOME}
            }
            else if(payload.teamHomeScore < payload.teamAwayScore && (payload.teamHomeScore + payload.teamAwayScore === 3)){
                dataIn = {...payload, winningTeam: WinningTeam.AWAY}
            }
            else{
                throw new BadRequestException("Wrong Score!!!")
            }

            const score = await this.prisma.matchResult.create({
                data: dataIn
            });

            this.createMatchDetail(payload.matchId);

            return score
        }
        catch(error){
            if(error.statusCode == 400){
                throw new BadRequestException("Match is Duplicate")
            }
            else{
                throw new BadRequestException(error.message);
            }
        }
    }

    async getAllMatchResult(): Promise<MatchResult[]>{
        try{
            return await this.prisma.matchResult.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTourMatchResultEach(resultId: MatchResult["id"]): Promise<MatchResult>{
        try{
            return await this.prisma.matchResult.findUniqueOrThrow({
                where:{
                    id: resultId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getTourMatchResult(tourId: Tournament["id"]): Promise<MatchResult[]>{
        try{
            let matchResult = []

            const matches = await this.getTourMatch(tourId);
            
            for(let match=0; match<matches.length; match++){

                let mr = await this.prisma.matchResult.findFirstOrThrow({
                    where:{
                        matchId: matches[match].id
                    }
                })
                
                matchResult.push({...mr})
            }

            return matchResult;
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    

    async createMatchDetail(matchId: Match["id"]): Promise<MatchDetail[]>{
        try{
            const gameCount = 3;
            
            let details = [];

            for(let game=0; game<gameCount; game++){
                const createDetail = await this.prisma.matchDetail.create({
                    data:{
                        matchId: matchId,
                        gameNum: game+1
                    }
                })

                details.push({...createDetail})
            }

            return details
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getAllDetail():Promise<MatchDetail[]>{
        try{
            return await this.prisma.matchDetail.findMany();
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async getMatchDetail(matchId: Match["id"]):Promise<MatchDetail[]>{
        try{
            return await this.prisma.matchDetail.findMany({
                where:{
                    matchId: matchId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async upload(detailId: MatchDetail["id"], imgUrl: DetailImgUrl): Promise<MatchDetail>{
        try{
            return await this.prisma.matchDetail.update({
                where:{
                    id: detailId
                },
                data: {
                    imgUrl: imgUrl.imgUrl,
                    status: UploadStatus.UPLOADED
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
}
