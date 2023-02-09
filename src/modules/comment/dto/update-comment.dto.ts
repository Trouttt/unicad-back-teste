import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto {
  @ApiPropertyOptional({
    description: 'Id of post',
    example: 'e15df6a7-3f41-4dcf-862c-67596cb8110e',
  })
  @IsString()
  @IsOptional()
  post_id: string;

  @ApiPropertyOptional({
    description: 'Description of comment',
    example: 'yeah man, i agree with everthing you have said',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  description: string;
}
