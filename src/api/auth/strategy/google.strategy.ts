import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
    //   clientID: "482212242241-ujq9dgds6flkichjb3jinmo56s3hsg5l.apps.googleusercontent.com",
    //   clientSecret: "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",
    //   callbackURL: "http://localhost:3000/auth/login/google/callback",
      clientID: "482212242241-7irqdj0b17e712en445irq6ov4nfcnvk.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://fyty-tournament-backend-production.up.railway.app/auth/login/google/callback",
      scope: ["email", "profile"]
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      username: name.givenName, 
      accessToken
    };
    done(null, user);
  }
}
