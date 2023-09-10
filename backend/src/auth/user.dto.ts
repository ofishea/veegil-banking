import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;
}

@InputType()
export class UserInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  accountNumber: string;

  @Field()
  accountBalance: string;

  @Field()
  password: string;
}

@InputType()
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
