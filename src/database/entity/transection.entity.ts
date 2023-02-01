import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

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
        allowNull: false,
    })
    deviceId: number;

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
        type: DataType.FLOAT,
        comment: 'ละติจูด',
    })
    lat: number;

    @Column({
        type: DataType.FLOAT,
        comment: 'ลองติจูด',
    })
    lon: number;

    @Column({
        type: DataType.NUMBER,
    })
    humidity: number;

    @Column({
        type: DataType.FLOAT,
    })
    temperature: number;

    @CreatedAt
    readonly createdAt?: Date;

    @UpdatedAt
    readonly updatedAt?: Date;
}
