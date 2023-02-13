import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'deliveries' })
export class DeliveryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'date' })
  date: string;

  @ApiProperty()
  @Column()
  origin: string;

  @ApiProperty()
  @Column()
  destination: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;
}
