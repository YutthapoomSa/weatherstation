import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DeviceDB } from './device.entity';

@Table({
    tableName: 'transection',
    comment: 'ตารางข้อมูล transection',
})
export class TransectionDB extends Model<TransectionDB> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: 'unique_user_id',
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
    })
    siteName: string;

    @Column({
        type: DataType.INTEGER,
    })
    heatIndex: number;

    @Column({
        type: DataType.DOUBLE,
        comment: 'ละติจูด',
    })
    lat: number;

    @Column({
        type: DataType.DOUBLE,
        comment: 'ลองติจูด',
    })
    lon: number;

    @Column({
        type: DataType.INTEGER,
    })
    humidity: number;

    @Column({
        type: DataType.DOUBLE,
    })
    temperature: number;

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
}
