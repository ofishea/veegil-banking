import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionHistory, TransactionHistoryDocument } from '../database/schemas/transaction-history.schema';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';

@Injectable()
export class TransactionHistoryService {
  constructor(
    @InjectModel(TransactionHistory.name) private readonly transactionHistoryModel: Model<TransactionHistoryDocument>,
  ) {}
  async create(CreateTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    const createdTransaction = new this.transactionHistoryModel(CreateTransactionHistoryDto);
    return createdTransaction.save();
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