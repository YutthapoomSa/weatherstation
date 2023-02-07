import { HttpException, HttpStatus, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { DataBase } from 'src/database/database.providers';
import { LogService } from 'src/helper/services/log.service';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { CreateTransactionDto } from '../dto/create-transection.dto';
import { TransactionDTO, TransactionPaginationResDTO } from '../dto/pagination.dto';
import { TransactionDB } from './../../../database/entity/transection.entity';
import { PaginationService } from './../../../helper/services/pagination/pagination.service';
import { DeviceDB } from './../../../database/entity/device.entity';
import moment from 'moment';

const lineNotify = require('line-notify-nodejs')('d3K7eG2kRtKVOA7RYQqESarSUwqQHGCvBjgQInDWN0E');
// const token = ''

@Injectable()
export class TransactionService implements OnApplicationBootstrap {
    private logger = new LogService(TransactionService.name);

    constructor(
        @Inject(DataBase.TransactionDB) private readonly transactionRepositoryModel: typeof TransactionDB,
        @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
        private paginationService: PaginationService,
    ) {}

    onApplicationBootstrap() {
        //
    }
    async create(body: CreateTransactionDto, event: string) {
        const tag = this.create.name;
        try {
            if (!body) throw new Error('data is required');

            const result = new TransactionDB();
            result.deviceId = body.deviceId;
            result.pm2 = body.pm2;
            result.pm10 = body.pm10;
            result.site_name = body.site_name;
            result.heat_index = body.heat_index;
            result.coor_lat = body.coor_lat;
            result.coor_lon = body.coor_lon;
            result.humidity = body.humidity;
            result.temperature = body.temperature;
            result.date_data = body.date_data;

            const resultsave = await result.save();
            if (resultsave) await this.lineNotifySend(event);
            if (!resultsave) await this.lineNotifySend(event);
            return resultsave;

            return result;
        } catch (error) {
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const isFind = await this.transactionRepositoryModel.count({});

            if (isFind <= 0) {
                throw new Error('no data try again later...');
            }

            const resultFindAll = await this.transactionRepositoryModel.findAll();

            return resultFindAll;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async transactionPagination(paginationDTO: TransactionDTO) {
        const tag = this.transactionPagination.name;
        try {
            const resData = {
                totalItems: 0,
                itemsPerPage: 0,
                totalPages: 0,
                currentPage: paginationDTO.page,
            };

            let findOption: FindOptions = {
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: DeviceDB,
                        attributes: { exclude: ['id', 'device_name'] },
                    },
                ],
            };
            if (paginationDTO.search) {
                const dataLike = this.paginationService.genSqlLike(['date_data', 'site_name'], paginationDTO.search);
                if (dataLike) {
                    findOption = Object.assign(findOption, dataLike);
                }
            }
            // จำนวนข้อมูลทั้งหมด ตามเงื่อนไข
            resData.totalItems = await this.transactionRepositoryModel.count(findOption);

            // คำนวณชุดข้อมูล
            const padding = this.paginationService.paginationCal(
                resData.totalItems,
                paginationDTO.perPages,
                paginationDTO.page,
            );

            Object.assign(findOption, { order: [['createdAt', 'DESC']] });

            resData.totalPages = padding.totalPages;

            Object.assign(findOption, { offset: padding.skips });
            Object.assign(findOption, { limit: padding.limit });

            const _result = await this.transactionRepositoryModel.findAll(findOption);
            const transactionIds = [];
            for (const item of _result) {
                transactionIds.push(item.id);
            }

            const _result2 = await this.transactionRepositoryModel.findAll({
                where: {
                    id: {
                        [Op.in]: transactionIds,
                    },
                },
                order: [['createdAt', 'DESC']],
            });
            resData.itemsPerPage = _result2.length;

            return new TransactionPaginationResDTO(
                ResStatus.success,
                '',
                _result2,
                resData.totalItems,
                resData.itemsPerPage,
                resData.totalPages,
                resData.currentPage,
            );
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async lineNotifySend(event: string) {
        const tag = this.lineNotifySend.name;
        try {
            lineNotify
                .notify({
                    message: `\n ส่งข้อมูล ${event} \n เวลา : ${moment()
                        .locale('th')
                        .add(543, 'year')
                        .format('DD MM YYYY, h:mm:ss a')}`,
                })
                .then(() => {
                    console.log('Sent complete');
                });
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
