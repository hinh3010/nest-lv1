import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDatabase() {
    //In a 1 - N relation, delete N firstly, then delete "1"
    console.log('cleanDatabase');
    return this.$transaction([
      //2 commands in ONE transaction
      this.note.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
