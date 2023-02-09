import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'soda makes you sick?',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Description of post',
    example:
      "i've heard of my friends that soda make persons sick, this is truth or not?",
  })
  @IsString()
  @MinLength(3)
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image_path?: string;
}
