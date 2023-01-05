import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Prisma, ReqStatus, Role, TeamStaus } from "@prisma/client";
import { Transform } from "class-transformer";
import { isString, IsString } from "class-validator";


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

export class UpdateTeamDto extends PartialType(AddTeamDto) {}

export class AddTeamMemberDto {
    @ApiProperty()
    @IsString()
    teamId: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiPropertyOptional()
    role: Role;
}

export class UpdateTeamMemberDto{
    @ApiProperty()
    role: Role;
}

export class AddTeamRequestDto{
    @ApiProperty()
    @IsString()
    teamId: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiPropertyOptional()
    status: ReqStatus
}