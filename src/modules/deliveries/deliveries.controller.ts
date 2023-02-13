import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { PageDto } from '../../shared/dtos/page.dto';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryEntity } from './entities/delivery.entity';

@ApiTags('Posts')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('deliveries')
export class DeliveriesController {
  constructor(private deliveriesService: DeliveriesService) {}

  @ApiOperation({
    summary: 'Create delivery',
    description: 'Create delivery endpoint. Create a new delivery',
  })
  @ApiCreatedResponse({ description: 'Created', type: DeliveryEntity })
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @ApiOperation({
    summary: 'FindAll delivery',
    description:
      'FindAll delivery endpoint. List all deliveries on the system.',
  })
  @ApiOkResponse({ description: 'Found', type: DeliveryEntity })
  @Get()
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<DeliveryEntity>> {
    return this.deliveriesService.findAll(pageOptionsDto);
  }
}
