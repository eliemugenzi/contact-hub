import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDTO } from './dto/register.dto';
import { comparePassword, hashPassword } from 'src/utils/helpers/password';
import { omit } from 'lodash';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(
    body: RegisterDTO,
  ): Promise<Omit<RegisterDTO, 'password'>> {
    const foundUser = await this.db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (foundUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = hashPassword(body.password);

    const userData = {
      ...body,
      password: hashedPassword,
    };

    const newUser = await this.db.user.create({
      data: userData,
    });

    return omit(newUser, ['password']);
  }

  async login(body: LoginDTO) {
    console.log('WHATS UP___', body);
    const foundUser = await this.db.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!comparePassword(body.password, foundUser.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtPayload = omit(foundUser, ['password', 'created_at']);
    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '7d',
    });

    return {
      ...omit(foundUser, ['password']),
      access_token: jwtToken,
    };
  }
}
