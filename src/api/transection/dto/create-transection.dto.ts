import { TransectionDB } from './../../../database/entity/transection.entity';
import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResStatus } from 'src/shared/enum/res-status.enum';
import { IsFloat } from 'sequelize-typescript';
export class CreateTransectionDto {
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
    siteName: string;

    @ApiProperty()
    @IsNumber()
    heatIndex: number;

    @ApiProperty()
    @IsNumber()
    lat: number;

    @ApiProperty()
    @IsNumber()
    lon: number;

    @ApiProperty()
    @IsNumber()
    humidity: number;

    @ApiProperty()
    @IsNumber()
    temperature: number;
}

export class CreateTransectionResDTOData {
    @ApiProperty()
    id: number;
    @ApiProperty()
    deviceId: number;
    @ApiProperty()
    pm2: number;
    @ApiProperty()
    pm10: number;
    @ApiProperty()
    siteName: string;
    @ApiProperty()
    heatIndex: number;
    @ApiProperty()
    lat: number;
    @ApiProperty()
    lon: number;
    @ApiProperty()
    humidity: number;
    @ApiProperty()
    temperature: number;
}

export class CreateTransectionResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateTransectionResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateTransectionResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: TransectionDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateTransectionResDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.deviceId = datas.deviceId;
            this.resData.pm2 = datas.pm2;
            this.resData.pm10 = datas.pm10;
            this.resData.siteName = datas.siteName;
            this.resData.heatIndex = datas.heatIndex;
            this.resData.lat = datas.lat;
            this.resData.lon = datas.lon;
            this.resData.humidity = datas.humidity;
            this.resData.temperature = datas.temperature;
        }
    }
}
