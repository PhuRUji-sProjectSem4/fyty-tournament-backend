import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString,IsNumberString, IsUrl, IsNumber } from "class-validator";


export class AddGameDto {
    @ApiProperty()
    @IsString()
    gameName: string;

    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    lineUpCap: number;

    @ApiPropertyOptional()
    coverUrl?: string;

    @ApiPropertyOptional()
    logoUrl?: string;
}

