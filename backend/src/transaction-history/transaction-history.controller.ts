import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TransactionHistoryService } from './transaction-history.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { TransactionHistory } from '../database/schemas/transaction-history.schema';

@Controller('transaction')
export class TransactionHistoryController {
  constructor(private readonly transactionHistoryService: TransactionHistoryService) {}

  @Post('transfer')
  async create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto): Promise<TransactionHistory> {
    const credit = this.transactionHistoryService.credit(createTransactionHistoryDto);
    const debit = this.transactionHistoryService.debit(createTransactionHistoryDto);
    return credit && debit;
  }

  @Get()
  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionHistoryService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionHistoryService.remove(id);
  }
}
