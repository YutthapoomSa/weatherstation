import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './service/transection.service';
import { CreateTransactionDto, CreateTransactionResDTO } from './dto/create-transection.dto';
import { UpdateTransectionDto } from './dto/update-transection.dto';
import { ApiTransactionService } from './service/api-transection.service';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionApiService: ApiTransactionService) {}

    @Post()
    @ApiOperation({ summary: 'สร้างรายการเมนู' })
    @ApiOkResponse({ type: CreateTransactionResDTO })
    async create(@Body() body: CreateTransactionDto) {
        return await this.transactionApiService.api_create(body);
    }
}
