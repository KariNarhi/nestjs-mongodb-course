import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as password from 'password-hash-and-salt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

@Controller('login')
export class AuthController {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') plaintextPassword: string,
  ) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      console.log('User does not exist on the database');

      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      password(plaintextPassword).verifyAgainst(
        user.passwordHash,
        (err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }

          const authJwtToken = sign({ email, roles: user.roles }, JWT_SECRET);

          resolve({ authJwtToken });
        },
      );
    });
  }
}
