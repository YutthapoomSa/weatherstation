import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transection.dto';

export class UpdateTransectionDto extends PartialType(CreateTransactionDto) {}
