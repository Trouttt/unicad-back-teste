import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  isDate,
  isDateString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    description: "Client's name",
    example: 'João de souza pereira',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "Delivery's Date",
    example: '20/10/2023',
  })
  date: string;

  @ApiProperty({
    description: "Delivery's origin",
    example: 'Rua patriarca de oliveira',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  origin: string;

  @ApiProperty({
    description: "Delivery's destination",
    example: 'Rua tiradentes japão',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  destination: string;
}
