import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';
import { AddGameDto } from 'src/dto/game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async getGames(): Promise<Game[]>{
        return this.gameService.getGames();
    }

    @Get(":id")
    async getGame(@Param("id", ParseIntPipe) gameId: number): Promise<Game>{
        return this.gameService.getGame(gameId);
    }

    @Post()
    async addGame(@Body() payload: AddGameDto) {
        return this.gameService.addGame(payload);
    }

    @Delete(":id")
    async deleteGame(@Param("id", ParseIntPipe) gameId: number): Promise<Game>{
        return await this.gameService.deleteGame(gameId);
    }
}
