import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { CreateReqDeviceDTO } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { DeviceDB } from './../../../database/entity/device.entity';

@Injectable()
export class DeviceService implements OnApplicationBootstrap {
    private logger = new LogService(DeviceService.name);

    constructor(
        @Inject(DataBase.DeviceDB) private readonly deviceRepositoryModel: typeof DeviceDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) {}

    onApplicationBootstrap() {
        //
    }
    async create(body: CreateReqDeviceDTO) {
        const tag = this.create.name;
        try {
            if (!body) throw new Error('data is required');

            const result = new DeviceDB();
            result.device_name = body.device_name;

            await result.save();
            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
