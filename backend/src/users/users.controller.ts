import { Controller, Get, Post, Body, Param, Put, Delete, UnauthorizedException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserInput, AuthInput } from '../auth/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async findOneByEmail(@Body('email') email: string, @Body('password') password: string) {
    const token = await this.authService.login(email, password);
  
  if (!token) {
    throw new UnauthorizedException('Invalid credentials');
  }

    return { token };
  }

  @Get('accountNumber/:accountNumber')
  findAccountNumber(@Param('accountNumber') accountNumber: string) {
    return this.usersService.getUserByAccountNumber(accountNumber);
  }

  @Get()
  findAll() {
    return this.usersService.findAll(); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
