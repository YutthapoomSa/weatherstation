import { Module } from '@nestjs/common';
import { DeviceService } from './service/device.service';
import { DeviceController } from './device.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ApiDeviceService } from './service/api-device.service';

@Module({
    imports: [SharedModule],
    controllers: [DeviceController],
    providers: [DeviceService, ApiDeviceService],
    exports: [DeviceService],
})
export class DeviceModule {}
