import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserInput, AuthInput, UserType } from './user.dto';
import { CreateUserDto, UpdateUserDto } from '../users/dto/user.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserType)
  async register(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Mutation(() => UserType)
  async login(@Args('authInput') authInput: AuthInput) {
    return this.authService.login(authInput);
  }

  @Mutation(() => String)
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
