import * as dotenv from 'dotenv';
import { DeliveryEntity } from 'src/modules/deliveries/entities/delivery.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

let migrationsDir: string;

if (process.env.NODE_ENV !== 'production') {
  migrationsDir = 'src/shared/typeorm/migrations/*';
} else {
  migrationsDir = 'dist/src/shared/typeorm/migrations/*';
}

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: true,
  migrations: [migrationsDir],
  entities: [DeliveryEntity],
  synchronize: false,
};

export const dataSource: DataSource = new DataSource(dataSourceOptions);
