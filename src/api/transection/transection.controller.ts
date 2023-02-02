import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto, CreateTransactionResDTO } from './dto/create-transection.dto';
import { ApiTransactionService } from './service/api-transection.service';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionApiService: ApiTransactionService) {}

    @Post()
    @ApiOperation({ summary: 'สร้างรายการ Transaction' })
    @ApiOkResponse({ type: CreateTransactionResDTO })
    async create(@Body() body: CreateTransactionDto) {
        return await this.transactionApiService.api_create(body);
    }
}
