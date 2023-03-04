import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { GameModule } from "./game/game.module";
import { TeamModule } from "./team/team.module";
import { TournamentModule } from "./tournament/tournament.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        AuthModule,
        GameModule,
        TeamModule,
        TournamentModule,
        UserModule,
    ],
    controllers: [],
    providers: []
})

export class ApiModule {}