import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { CreateTransectionDto } from '../dto/create-transection.dto';
import { TransectionDB } from './../../../database/entity/transection.entity';

@Injectable()
export class TransectionService implements OnApplicationBootstrap {
    private logger = new LogService(TransectionService.name);

    constructor(
        @Inject(DataBase.TransectionDB) private readonly transectionRepositoryModel: typeof TransectionDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
    ) {}

    onApplicationBootstrap() {
        //
    }
    async create(body: CreateTransectionDto) {
        const tag = this.create.name;
        try {
            if (!body) throw new Error('data is required');

            const result = new TransectionDB();
            result.deviceId = body.deviceId;
            result.pm2 = body.pm2;
            result.pm10 = body.pm10;
            result.siteName = body.siteName;
            result.heatIndex = body.heatIndex;
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
