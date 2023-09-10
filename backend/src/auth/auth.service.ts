import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInput, AuthInput } from './user.dto';
import { CreateUserDto, UpdateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async login(authInput: AuthInput) {
    const { email, password } = authInput; // Extract email and password
    const user = await this.usersService.authenticateUser(email, password);
    const payload = { email: user.email, password: user.password }; // Customize the payload as needed
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}