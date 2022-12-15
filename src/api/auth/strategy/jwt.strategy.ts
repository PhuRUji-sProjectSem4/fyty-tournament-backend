import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { env } from "process";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: env.JWT_SECRET_KEY
    });
  }

  async validate(payload: any){
    try{
      if(!payload.sub){
        throw new UnauthorizedException("Invalid Token Format");
      }
      return await this.authService.getUserById(payload.sub);
    }
    catch(error){
      throw new UnauthorizedException();
    }
  }
}
