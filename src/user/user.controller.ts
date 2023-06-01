import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(MyJwtGuard) //you can also make your own "decorator"
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}
