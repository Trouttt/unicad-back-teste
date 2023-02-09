import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AwsS3ResponseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:
      'https://leozinho.s3.amazonaws.com/public/Foods/1664455569790/arrozdoce?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3VZTKFA6V56ND76U%2F20220929%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220929T124609Z&X-Amz-Expires=900&X-Amz-Signature=1b3a4ae1bc74c766d3eadfd02efdf6948cdc018a9c6f7f9719e2558635d71ec2&X-Amz-SignedHeaders=host',
    description: 'Url to send a request with the file',
  })
  upload_url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'public/Foods/1664455569790/arrozdoce',
    description: 'Url to access the file',
  })
  path_url: string;
}
