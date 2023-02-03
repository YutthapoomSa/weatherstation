import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import moment from 'moment';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { TransactionDB } from './../../../database/entity/transection.entity';

export class TransactionDTO {
    @ApiProperty({
        example: '10',
    })
    @IsNotEmpty()
    @IsNumber()
    perPages: number;

    @ApiProperty({
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        example: '',
    })
    @IsString()
    search: string;
}

export class DeviceData {
    @ApiProperty()
    device_id: number;
    @ApiProperty()
    device_name: string;
}

export class TransactionDTOData {
    @ApiProperty()
    id: number;
    @ApiProperty()
    pm2: number;
    @ApiProperty()
    pm10: number;
    @ApiProperty()
    site_name: string;
    @ApiProperty()
    heat_index: number;
    @ApiProperty()
    coor_lat: number;
    @ApiProperty()
    coor_lon: number;
    @ApiProperty()
    humidity: number;
    @ApiProperty()
    temperature: number;
    @ApiProperty()
    date_data: string;
    @ApiProperty()
    deviceId: number;
}

export class TransactionPaginationResDTOResData {
    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty({
        type: () => [TransactionDTOData],
    })
    datas: TransactionDTOData[];
}

export class TransactionPaginationResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [TransactionPaginationResDTOResData],
        description: 'ข้อมูล',
    })
    resData: TransactionPaginationResDTOResData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(
        resStatus: ResStatus,
        msg: string,
        datas: TransactionDB[],
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number,
    ) {
        this.resCode = resStatus;
        this.msg = msg;
        this.resData = [];

        const _resData = new TransactionPaginationResDTOResData();
        _resData.itemsPerPage = itemsPerPage;
        _resData.totalItems = totalItems;
        _resData.currentPage = currentPage;
        _resData.totalPages = totalPages;
        _resData.datas = [];

        if (!!datas && datas.length > 0) {
            for (const data of datas) {
                const _data = new TransactionDTOData();
                _data.id = data.id;
                _data.deviceId = data.deviceId;
                _data.pm2 = data.pm2;
                _data.pm10 = data.pm10;
                _data.site_name = data.site_name;
                _data.heat_index = data.heat_index;
                _data.coor_lat = data.coor_lat;
                _data.coor_lon = data.coor_lon;
                _data.humidity = data.humidity;
                _data.temperature = data.temperature;
                _data.date_data = moment(data.date_data).format('YYYY-MM-DD');
                _resData.datas.push(_data);
            }
            this.resData.push(_resData);
        }
    }
}
