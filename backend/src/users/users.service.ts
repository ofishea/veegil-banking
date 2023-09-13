import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  logger = new Logger('UserService');
  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    createUserDto.password = hashedPassword;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return updatedUser;
  }

  async getUserByAccountNumber(accountNumber: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ accountNumber }).exec();
      return user || null;
    } catch (error) {
      throw new Error('Error searching for user by account number');
    }
  }

  async findPhoneNumber(phoneNumber: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ phoneNumber }).exec();
      return user || null;
    } catch (error) {
      throw new Error('Error searching for user by phone number');
    }
  } 

  async findEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user || null;
    } catch (error) {
      throw new Error('Error searching for user by email');
    }
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for user with email ${password}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User with email ${email} authenticated successfully`);
    return user;
  }
}