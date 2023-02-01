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
        type: DataType.BIGINT,
        comment: 'ละติจูด',
    })
    lat: bigint;

    @Column({
        type: DataType.BIGINT,
        comment: 'ลองติจูด',
    })
    lon: bigint;

    @Column({
        type: DataType.NUMBER,
    })
    humidity: number;

    @Column({
        type: DataType.BIGINT,
    })
    temperature: bigint;

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
