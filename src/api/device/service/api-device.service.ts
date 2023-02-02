import { forwardRef, HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { DeviceDB } from './../../../database/entity/device.entity';
import { CreateReqDeviceDTO, CreateResDeviceDTO } from './../dto/create-device.dto';
import { DeviceService } from './device.service';
import { ResStatus } from 'src/shared/enum/res-status.enum';

@Injectable()
export class ApiDeviceService implements OnApplicationBootstrap {
    private logger = new LogService(ApiDeviceService.name);

    constructor(
        @Inject(DataBase.DeviceDB) private deviceRepository: typeof DeviceDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,
        @Inject(forwardRef(() => DeviceService))
        private deviceService: DeviceService,
    ) {}
    onApplicationBootstrap() {
        //
    }

    async api_create(body: CreateReqDeviceDTO): Promise<CreateResDeviceDTO> {
        const tag = this.api_create.name;
        try {
            const createDevice = await this.deviceRepository.create(body);
            return new CreateResDeviceDTO(ResStatus.success, '', createDevice);
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
