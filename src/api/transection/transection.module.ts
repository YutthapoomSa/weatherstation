import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ApiTransactionService } from './service/api-transection.service';
import { TransactionService } from './service/transection.service';
import { TransactionController } from './transection.controller';

@Module({
    imports: [SharedModule],
    controllers: [TransactionController],
    providers: [TransactionService, ApiTransactionService],
    exports: [TransactionService],
})
export class TransectionModule {}
