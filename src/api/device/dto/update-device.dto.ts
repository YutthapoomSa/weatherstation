import { PartialType } from '@nestjs/swagger';
import { CreateReqDeviceDTO } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateReqDeviceDTO) {}
