import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { TourStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class AddTournamentDto {
    @ApiProperty()
    @IsString()
    tourName: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    currentJoin: number;

    @ApiPropertyOptional()
    coverUrl: string;

    @ApiProperty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    prize: number;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    regStartTime: string;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    regEndTime: string;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    tourStartTime: string;

    @ApiProperty()
    @Transform(({value}) => new Date(value))
    tourEndTime: string;

    @ApiProperty()
    @IsString()
    gameId: string;

    @ApiProperty()
    @IsString()
    ownerId: string;

    @ApiPropertyOptional()
    status: TourStatus;

    @ApiPropertyOptional()
    rule: string;

}

export class UpdateTournamentDto extends PartialType(AddTournamentDto) {}

export class AddTournamentJoinDto {
    @ApiProperty()
    @IsString()
    tourId: string;

    @ApiProperty()
    @IsString()
    teamId: string;

    @ApiPropertyOptional()
    loseCount: number;
}