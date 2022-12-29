import { BadRequestException, Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';
import { Recoverable } from 'repl';
import { AddGameDto } from 'src/dto/game.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {}

    async getGames(): Promise<Game[]>{
        return await this.prisma.game.findMany();
    }
    
    async getGame(gameId: Game['id']): Promise<Game>{
        try{
            return await this.prisma.game.findUniqueOrThrow({where: { id: gameId }});
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async addGame(payload: AddGameDto): Promise<Game>{
        try{
            return await this.prisma.game.create({data: payload});
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }

    async addManyGame(): Promise<any>{
        try{
            return await this.prisma.game.createMany({ data: [
                {gameName: "ROV", lineUpCap: 5, logoUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameLogo%2Flogo_rov.png?alt=media&token=d2507fea-1efe-490b-b7b5-ade367b47a87", coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Frov.webp?alt=media&token=2f4812ea-9e98-4a81-969c-8d3f1025ecbd"},
                {gameName: "Valorant", lineUpCap: 5, logoUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameLogo%2Flogo_valo.png?alt=media&token=494e7007-565c-4c68-8006-b447b5fb1795", coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Fvalo.jpg?alt=media&token=4a807c94-df56-4c8f-ac5d-253da7247877"},
                {gameName: "Dota2", lineUpCap: 5, logoUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameLogo%2Flogo_dota2.png?alt=media&token=e5f59b55-db88-4e0b-9e39-c47a2b4931f0", coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Fdota2.jpg?alt=media&token=4353608c-21d9-4ba3-b1da-d85baf262f8e"},
                {gameName: "PUBG", lineUpCap: 4, logoUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameLogo%2Flogo_pubg.png?alt=media&token=42b6abc2-8b75-4c55-895c-a8d402266b76", coverUrl: "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FGameCover%2Fpubg.jpg?alt=media&token=372dd582-de2b-47fb-bb3e-12448cac6893"},
               ], skipDuplicates: true, })
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
    
    async deleteGame(gameId: Game['id']): Promise<Game> {
        try{
            return await this.prisma.game.delete({where: { id: gameId }});
        }
        catch(error){
            throw new BadRequestException(error.message);
        }
    }
}
