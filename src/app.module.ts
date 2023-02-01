import { ApiTransectionService } from './api/transection/service/api-transection.service';
import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './api/users/users.module';
import { ConvertImageService } from './helper/services/convert-image.service';
import { EncryptionService } from './helper/services/encryption.service';
import { LogService } from './helper/services/log.service';
import { PaginationService } from './helper/services/pagination/pagination.service';
import { SharedModule } from './shared/shared.module';
import { TransectionModule } from './api/transection/transection.module';
@Module({
    imports: [
        CacheModule.register(),
        UsersModule,
        SharedModule,
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 60,
        }),
        TransectionModule,
    ],
    providers: [ApiTransectionService, LogService, ConvertImageService, EncryptionService, PaginationService],
})
export class AppModule {}
