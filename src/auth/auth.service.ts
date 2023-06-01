import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    try {
      // generate password to hashed password
      const hashedPassword = await argon.hash(authDTO.password);

      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firstName: '',
          lastName: '',
        },
        //only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      //you should add constraint "unique" to user table
      return await this.signJwtToken(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        //for simple
        throw new ForbiddenException('User with this email already exists');
      }
      throw new Error(error.message);
    }
  }

  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );

    if (!passwordMatched) throw new ForbiddenException('Incorrect password');

    delete user.hashedPassword; //remove 1 field in the object
    return await this.signJwtToken(user.id, user.email);
  }

  //now convert to an object, not string
  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
