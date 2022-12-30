import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddUserDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsString()
    email: string;

    @ApiPropertyOptional()
    displayName?: string;

    @ApiPropertyOptional()
    slogan?: string;

    @ApiPropertyOptional()
    coverUrl?: string;

    @ApiPropertyOptional()
    protraiUrl?: string;

    @ApiPropertyOptional()
    createdAt: Date;
}

export class UpdateUserDto extends PartialType(AddUserDto) {}