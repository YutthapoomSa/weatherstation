import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import moment from 'moment';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { TransactionDB } from './../../../database/entity/transection.entity';
export class CreateTransactionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    deviceId: number;

    @ApiProperty()
    @IsNumber()
    pm2: number;

    @ApiProperty()
    @IsNumber()
    pm10: number;

    @ApiProperty()
    @IsString()
    site_name: string;

    @ApiProperty()
    @IsNumber()
    heat_index: number;

    @ApiProperty()
    @IsNumber()
    coor_lat: number;

    @ApiProperty()
    @IsNumber()
    coor_lon: number;

    @ApiProperty()
    @IsNumber()
    humidity: number;

    @ApiProperty()
    @IsNumber()
    temperature: number;

    @ApiProperty()
    @IsISO8601()
    date_data: string;
}

export class CreateTransactionResDTOData {
    @ApiProperty()
    id: number;
    @ApiProperty()
    deviceId: number;
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
}

export class CreateTransactionResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateTransactionResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateTransactionResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: TransactionDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateTransactionResDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.deviceId = datas.deviceId;
            this.resData.pm2 = datas.pm2;
            this.resData.pm10 = datas.pm10;
            this.resData.site_name = datas.site_name;
            this.resData.heat_index = datas.heat_index;
            this.resData.coor_lat = datas.coor_lat;
            this.resData.coor_lon = datas.coor_lon;
            this.resData.humidity = datas.humidity;
            this.resData.temperature = datas.temperature;
            this.resData.date_data = moment(datas.date_data).format('YYY-MM-DD')
        }
    }
}
