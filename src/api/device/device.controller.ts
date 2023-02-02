import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceService } from './service/device.service';
import { CreateReqDeviceDTO, CreateResDeviceDTO } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiDeviceService } from './service/api-device.service';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('device')
export class DeviceController {
    constructor(private readonly apiDeviceService: ApiDeviceService) {}

    @Post()
    @ApiOperation({ summary: 'สร้างรายการอุปกรณ์' })
    @ApiOkResponse({ type: CreateResDeviceDTO })
    async create(@Body() body: CreateReqDeviceDTO) {
        return await this.apiDeviceService.api_create(body);
    }
}
