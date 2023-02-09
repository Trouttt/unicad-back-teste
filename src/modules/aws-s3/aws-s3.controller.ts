import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AwsS3Service } from './aws-s3.service';
import { GenerateUrlDTO } from './dto/generate-url.dto';
import { AwsS3ResponseDTO } from './dto/aws-s3-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('aws-s3')
@ApiBearerAuth('jwt-token')
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) { }

  @ApiOperation({
    summary: 'create media',
    description: 'Create media endpoint. Create a new media',
  })
  @ApiCreatedResponse({ description: 'Created', type: AwsS3ResponseDTO })
  @Post()
  create(
    @Body()
    generateMediaS3: GenerateUrlDTO,
  ) {
    const { folder_name } = generateMediaS3;
    return this.awsS3Service.createMediaS3(folder_name);
  }
}
