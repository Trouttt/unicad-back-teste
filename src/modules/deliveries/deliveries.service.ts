import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDataDto } from '../../shared/dtos/page-meta-data.dto';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { PageDto } from '../../shared/dtos/page.dto';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryEntity } from './entities/delivery.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(DeliveryEntity)
    public readonly deliveryRepository: Repository<DeliveryEntity>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = this.deliveryRepository.create(createDeliveryDto);

    return this.deliveryRepository.save(delivery);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const {
      [0]: data,
      [1]: itemCount,
    }: [data: DeliveryEntity[], total: number] =
      await this.deliveryRepository.findAndCount({
        order: { created_at: pageOptionsDto.order },
        take: pageOptionsDto.take,
        skip: pageOptionsDto.skip,
      });
    const pageMetaDataDto = new PageMetaDataDto({
      item_count: itemCount,
      page_options_dto: pageOptionsDto,
    });

    return new PageDto(data, pageMetaDataDto);
  }
}
