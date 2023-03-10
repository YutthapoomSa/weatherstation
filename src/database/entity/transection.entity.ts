import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DeviceDB } from './device.entity';

@Table({
    tableName: 'transaction',
    comment: 'ตารางข้อมูล transection',
})
export class TransactionDB extends Model<TransactionDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_transaction_id',
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
    })
    pm2: number;

    @Column({
        type: DataType.INTEGER,
    })
    pm10: number;

    @Column({
        type: DataType.STRING,
        comment: 'สถานที่',
    })
    site_name: string;

    @Column({
        type: DataType.INTEGER,
        comment: 'ดัชนีความร้อน',
    })
    heat_index: number;

    @Column({
        type: DataType.DOUBLE,
        comment: 'ละติจูด',
    })
    coor_lat: number;

    @Column({
        type: DataType.DOUBLE,
        comment: 'ลองติจูด',
    })
    coor_lon: number;

    @Column({
        type: DataType.INTEGER,
        comment: 'ความชื้น',
    })
    humidity: number;

    @Column({
        type: DataType.DOUBLE,
        comment: 'อุณหภูมิ',
    })
    temperature: number;

    @Column({
        type: DataType.STRING,
        comment: 'วัน',
        defaultValue: new Date(),
    })
    date_data: Date;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;

    @ForeignKey(() => DeviceDB)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'device_id',
    })
    deviceId: number;

    @BelongsTo(() => DeviceDB)
    deviceLists: DeviceDB;
}
