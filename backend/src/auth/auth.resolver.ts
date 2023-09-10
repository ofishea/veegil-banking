import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserInput, AuthInput, UserType } from './user.dto';
import { CreateUserDto, UpdateUserDto } from '../users/dto/user.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserInput)
  async register(@Args('input') createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto); 
  }

  @Mutation(() => AuthInput) 
  async login(@Args('input') authInput: AuthInput) {
    const token = await this.authService.login(authInput);

    if (!token) {
      throw new UnauthorizedException('Invalid credentials'); // Handle invalid login
    }
  
    return { email: authInput.email, password: authInput.password, token };
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async protectedResource(@Context() context) {
    const user = context.req['user']; // Access user data from the request
    
    if (!user) {
      // Handle unauthorized access
      throw new Error('Unauthorized');
    }

    // This resolver is protected and requires authentication
    return 'Protected resource accessed';
  }
}
