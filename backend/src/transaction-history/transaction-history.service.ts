import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { TransactionHistory, TransactionHistoryDocument } from '../database/schemas/transaction-history.schema';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(TransactionHistory.name) private readonly transactionHistoryModel: Model<TransactionHistoryDocument>,
  ) {}
  async credit(CreateTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    const session = await this.userModel.startSession();
  
    try {
      session.startTransaction();
  
      const { amount, fromAccountNumber, fromAccountName, toAccountNumber, toAccountName, date, time } = CreateTransactionHistoryDto;
  
      const sender = await this.userModel.findOne({ accountNumber: fromAccountNumber }).session(session);
      const receiver = await this.userModel.findOne({ accountNumber: toAccountNumber }).session(session);
  
      if (!sender || !receiver) {
        throw new NotFoundException('Sender or receiver not found');
      }
  
      if (sender.accountBalance < amount) {
        throw new BadRequestException('Insufficient balance');
      }
  
      receiver.accountBalance = receiver.accountBalance + +amount;
  
      const createTransaction = new this.transactionHistoryModel(CreateTransactionHistoryDto);
      createTransaction.reference = this.generateRandomString(6);
      createTransaction.amount = amount;
      createTransaction.fromAccountNumber = fromAccountNumber;
      createTransaction.fromAccountName = fromAccountName;
      createTransaction.toAccountNumber = toAccountNumber;
      createTransaction.toAccountName = toAccountName;
      createTransaction.type = 'credit';
      createTransaction.date = date;
      createTransaction.time = time;
  
    //  await createTransaction.save();
      receiver.transactionHistory.push({
        reference: createTransaction.reference,
        amount: createTransaction.amount,
        fromAccountNumber: createTransaction.fromAccountNumber,
        fromAccountName: createTransaction.fromAccountName,
        toAccountNumber: createTransaction.toAccountNumber,
        toAccountName: createTransaction.toAccountName,
        type: createTransaction.type,
        date: createTransaction.date,
        time: createTransaction.time,
      });

      await receiver.save();
  
      await session.commitTransaction();
      session.endSession();
  
      return createTransaction;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  
  async debit(CreateTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    const session = await this.userModel.startSession();
  
    try {
      session.startTransaction();
  
      const { amount, fromAccountNumber, fromAccountName, toAccountNumber, toAccountName, date, time } = CreateTransactionHistoryDto;
  
      const sender = await this.userModel.findOne({ accountNumber: fromAccountNumber }).session(session);
      const receiver = await this.userModel.findOne({ accountNumber: toAccountNumber }).session(session);
  
      if (!sender || !receiver) {
        throw new NotFoundException('Sender or receiver not found');
      }
  
      if (sender.accountBalance < amount) {
        throw new BadRequestException('Insufficient balance');
      }
  
      sender.accountBalance -= amount;
  
      const createTransaction = new this.transactionHistoryModel(CreateTransactionHistoryDto);
      createTransaction.reference = this.generateRandomString(6);
      createTransaction.amount = amount;
      createTransaction.fromAccountNumber = fromAccountNumber;
      createTransaction.fromAccountName = fromAccountName;
      createTransaction.toAccountNumber = toAccountNumber;
      createTransaction.toAccountName = toAccountName;
      createTransaction.type = 'debit';
      createTransaction.date = date;
      createTransaction.time = time;
  
    //  await createTransaction.save();
      sender.transactionHistory.push({
        reference: createTransaction.reference,
        amount: createTransaction.amount,
        fromAccountNumber: createTransaction.fromAccountNumber,
        fromAccountName: createTransaction.fromAccountName,
        toAccountNumber: createTransaction.toAccountNumber,
        toAccountName: createTransaction.toAccountName,
        type: createTransaction.type,
        date: createTransaction.date,
        time: createTransaction.time,
      });
  
      await sender.save();
  
      await session.commitTransaction();
      session.endSession();
  
      return createTransaction;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
  


  
  generateRandomString(length: number): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    
    return randomString;
  }

  async findByAccountNumber(accountNumber: number): Promise<User | null> {
    return this.userModel.findOne({ accountNumber }).exec();
  }

  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionHistoryModel.find().exec();
  }

  async findOne(id: string): Promise<TransactionHistory> {
    return this.transactionHistoryModel.findById(id).exec();
  }

  async update(id: string, UpdateTransactionHistoryDto: UpdateTransactionHistoryDto): Promise<TransactionHistory> {
    return this.transactionHistoryModel.findByIdAndUpdate(id, UpdateTransactionHistoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<TransactionHistory> {
    return this.transactionHistoryModel.findByIdAndRemove(id).exec();
  }
}