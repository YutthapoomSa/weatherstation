import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByDateReqDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    createdAt: Date;
}
