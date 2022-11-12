import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { AddGameDto } from 'src/dto/game.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {}

    async getGames(): Promise<Game[]>{
        return await this.prisma.game.findMany();
    }
    
    async getGame(gameId: number): Promise<Game>{
        try{
            return await this.prisma.game.findUnique({
                where: {
                    id: gameId,
                },
            });
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
    }

    async addGame(payload: AddGameDto): Promise<Game>{
        try{
            return await this.prisma.game.create({data: payload});
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
    }
    
    async deleteGame(gameId: number): Promise<Game> {
        try{
            return await this.prisma.game.delete({
                where: {
                    id: gameId
                }
            });
        }
        catch(error){
            throw new BadRequestException(error.massage);
        }
    }
}
