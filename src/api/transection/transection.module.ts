import { Module } from '@nestjs/common';
import { TransectionService } from './service/transection.service';
import { TransectionController } from './transection.controller';

@Module({
  controllers: [TransectionController],
  providers: [TransectionService]
})
export class TransectionModule {}
