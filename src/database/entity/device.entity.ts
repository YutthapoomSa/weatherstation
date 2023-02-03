import { TransactionDB } from './transection.entity';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'device',
    comment: 'ตารางข้อมูล device',
})
export class DeviceDB extends Model<DeviceDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'device_id',
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    device_name: string;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;

    @HasMany(() => TransactionDB)
    transectionLists: TransactionDB[];
    
}
