import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { CreateTransactionDto } from '../dto/create-transection.dto';
import { TransactionDB as TransactionDB } from './../../../database/entity/transection.entity';

@Injectable()
export class TransactionService implements OnApplicationBootstrap {
    private logger = new LogService(TransactionService.name);

    constructor(
        @Inject(DataBase.TransactionDB) private readonly transactionRepositoryModel: typeof TransactionDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) {}

    onApplicationBootstrap() {
        //
    }
    async create(body: CreateTransactionDto) {
        const tag = this.create.name;
        try {
            if (!body) throw new Error('data is required');

            const result = new TransactionDB();
            result.deviceId = body.deviceId;
            result.pm2 = body.pm2;
            result.pm10 = body.pm10;
            result.site_name = body.site_name;
            result.heat_index = body.heat_index;
            result.lat = body.lat;
            result.lon = body.lon;
            result.humidity = body.humidity;
            result.temperature = body.temperature;

            await result.save();
            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
