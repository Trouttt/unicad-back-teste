import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostEntity } from 'src/modules/posts/entities/post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  post?: Post[];*/

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiPropertyOptional()
  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @ApiPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;

  @ApiPropertyOptional()
  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
