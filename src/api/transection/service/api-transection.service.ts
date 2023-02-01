/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { TransectionDB } from 'src/database/entity/transection.entity';
import { LogService } from 'src/helper/services/log.service';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateTransectionDto, CreateTransectionResDTO } from '../dto/create-transection.dto';
import { TransectionService } from './transection.service';

@Injectable()
export class ApiTransectionService implements OnApplicationBootstrap {
    private logger = new LogService(ApiTransectionService.name);

    constructor(
        @Inject(DataBase.TransectionDB) private transectionRepository: typeof TransectionDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,
        @Inject(forwardRef(() => TransectionService))
        private transectionService: TransectionService,
    ) {}

    async onApplicationBootstrap() {
        //
    }

    async api_create(body: CreateTransectionDto): Promise<CreateTransectionResDTO> {
        const tag = this.api_create.name;
        try {
            return new CreateTransectionResDTO(ResStatus.success, '', await this.transectionService.create(body));
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
