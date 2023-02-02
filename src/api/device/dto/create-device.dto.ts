import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DeviceDB } from 'src/database/entity/device.entity';
import { ResStatus } from 'src/shared/enum/res-status.enum';

export class CreateReqDeviceDTO {
    @ApiProperty()
    @IsString()
    device_name: string;
}

export class CreateResDeviceDTOData {
    @ApiProperty()
    id: number;
    @ApiProperty()
    device_name: string;
}

export class CreateResDeviceDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateResDeviceDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateResDeviceDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: DeviceDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateResDeviceDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.device_name = datas.device_name;
        }
    }
}
