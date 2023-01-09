import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Game } from '@prisma/client';
import { AddGameDto } from 'src/dto/game.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async getGames(): Promise<Game[]>{
        return await this.gameService.getGames();
    }

    @Get(":id")
    async getGame(@Param("id") gameId: Game['id']): Promise<Game>{
        return await this.gameService.getGame(gameId);
    }

    @Post()
    async addGame(@Body() payload: AddGameDto): Promise<Game> {
        return await this.gameService.addGame(payload);
    }

    @Post("/all")
    async addManyGame():Promise<Game[]> {
        return await this.gameService.addManyGame();
    }

    @Delete(":id")
    async deleteGame(@Param("id") gameId: Game['id']): Promise<Game>{
        return await this.gameService.deleteGame(gameId);
    }
}
