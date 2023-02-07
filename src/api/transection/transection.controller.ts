import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto, CreateTransactionResDTO } from './dto/create-transection.dto';
import { TransactionDTO, TransactionPaginationResDTO } from './dto/pagination.dto';
import { ApiTransactionService } from './service/api-transection.service';
import { TransactionService } from './service/transection.service';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionApiService: ApiTransactionService,
        private readonly transactionService: TransactionService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'สร้างรายการ Transaction' })
    @ApiOkResponse({ type: CreateTransactionResDTO })
    async create(@Body() body: CreateTransactionDto, event: string) {
        return await this.transactionApiService.api_create(body, event);
    }

    @Post('paginationTransaction')
    @ApiOperation({ summary: 'Pagination Transaction' })
    @ApiOkResponse({ type: TransactionPaginationResDTO })
    async paginationAgency(@Body() paginationDTO: TransactionDTO): Promise<TransactionPaginationResDTO> {
        return await this.transactionService.transactionPagination(paginationDTO);
    }
}
