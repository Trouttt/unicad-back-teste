import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.id, {
    cascade: false,
    eager: true,
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comment: CommentEntity[];

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  image_path?: string;

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
