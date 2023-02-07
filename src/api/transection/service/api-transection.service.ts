/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { TransactionDB as TransactionDB } from 'src/database/entity/transection.entity';
import { LogService } from 'src/helper/services/log.service';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateTransactionDto, CreateTransactionResDTO } from '../dto/create-transection.dto';
import { TransactionService as TransactionService } from './transection.service';

@Injectable()
export class ApiTransactionService implements OnApplicationBootstrap {
    private logger = new LogService(ApiTransactionService.name);

    constructor(
        @Inject(DataBase.TransactionDB) private transactionRepository: typeof TransactionDB,
        @Inject('SEQUELIZE') private sequelize: Sequelize,
        @Inject(forwardRef(() => TransactionService))
        private transactionService: TransactionService,
    ) {}

    async onApplicationBootstrap() {
        //
    }

    async api_create(body: CreateTransactionDto,event: string): Promise<CreateTransactionResDTO> {
        const tag = this.api_create.name;
        try {
            return new CreateTransactionResDTO(ResStatus.success, '', await this.transactionService.create(body,event));
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
