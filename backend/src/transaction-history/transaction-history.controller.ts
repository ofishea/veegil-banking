import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { TransactionHistory } from '../database/schemas/transaction-history.schema';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(private readonly transactionHistoryService: TransactionHistoryService) {}

  @Post()
  async create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    return this.transactionHistoryService.create(createTransactionHistoryDto);
  }

  @Get()
  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionHistoryService.findAll();
  }
}
