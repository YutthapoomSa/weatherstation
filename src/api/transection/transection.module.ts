import { ApiUsersService } from './../users/services/api-users.service';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TransectionService } from './service/transection.service';
import { TransectionController } from './transection.controller';
import { ApiTransectionService } from './service/api-transection.service';

@Module({
    imports: [SharedModule],
    controllers: [TransectionController],
    providers: [TransectionService, ApiTransectionService],
    exports: [TransectionService],
})
export class TransectionModule {}
