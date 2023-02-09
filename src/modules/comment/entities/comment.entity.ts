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
import { PostEntity } from 'src/modules/posts/entities/post.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.id, {
    cascade: false,
    eager: true,
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: UserEntity;

  @ApiProperty({ type: () => PostEntity })
  @ManyToOne(() => PostEntity, (post) => post.id, {
    cascade: false,
    eager: true,
  })
  @JoinColumn({ name: 'post', referencedColumnName: 'id' })
  post: PostEntity;

  @ApiProperty()
  @Column()
  description: string;

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
