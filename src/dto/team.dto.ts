import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TeamStaus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";


export class AddTeamDto {
    @ApiProperty()
    @IsString()
    teamName: string;

    @ApiPropertyOptional()
    slogan?: string;
    
    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    coverUrl?: string;

    @ApiPropertyOptional()
    logoUrl?: string;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    currentMember: number;

    @ApiProperty()
    @IsString()
    gameId: string;
 
    @ApiProperty()
    @IsString()
    ownerId: string;

    @ApiPropertyOptional()
    teamStatus: TeamStaus;

    @ApiPropertyOptional()
    createdAt: Date;
}
