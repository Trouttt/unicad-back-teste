import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsObject,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Id of post',
    example: 'e15df6a7-3f41-4dcf-862c-67596cb8110e',
  })
  @IsString()
  post_id?: string;

  @ApiProperty({
    description: 'Description of comment',
    example: 'yeah man, i agree with everthing you have said',
  })
  @IsString()
  @MinLength(3)
  description: string;
}
