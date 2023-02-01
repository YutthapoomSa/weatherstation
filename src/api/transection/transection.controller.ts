import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransectionService } from './service/transection.service';
import { CreateTransectionDto, CreateTransectionResDTO } from './dto/create-transection.dto';
import { UpdateTransectionDto } from './dto/update-transection.dto';
import { ApiTransectionService } from './service/api-transection.service';

@ApiTags('transection')
@Controller('transection')
export class TransectionController {
    constructor(private readonly transectionApiService: ApiTransectionService) {}

    @Post()
    @ApiOperation({ summary: 'สร้างรายการเมนู' })
    @ApiOkResponse({ type: CreateTransectionResDTO })
    async create(@Body() body: CreateTransectionDto) {
        return await this.transectionApiService.api_create(body);
    }
}
