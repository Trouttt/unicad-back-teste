import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GenerateUrlDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Foods',
    description: 'folder of file',
  })
  folder_name: string;
}
