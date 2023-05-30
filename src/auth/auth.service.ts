import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async register(authDTO: AuthDTO) {
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
    return user;
  }

  login() {
    return {
      message: 'login',
    };
  }
}
