import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryEntity } from './entities/delivery.entity';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { PageDto } from '../../shared/dtos/page.dto';

const createDeliveryDto: CreateDeliveryDto = {
  name: 'LEONARDO',
  date: '20/10/2000',
  origin: 'RUA MANOEL FRANCISCO',
  destination: 'RUA TIRADENTES',
};
const deliveryEntityList: DeliveryEntity[] = [
  {
    id: 'gsagas',
    name: 'LEONARDO',
    date: '20/10/2000',
    origin: 'RUA MANOEL FRANCISCO',
    destination: 'RUA TIRADENTES',
  },
  {
    id: '1521251rwqrqw21412rwqr123',
    name: 'JOÃO',
    date: '15/07/2010',
    origin: 'RUA TIKTOK',
    destination: 'RUA BIUBIU',
  },
  {
    id: '5109250195K1209K09F09',
    name: 'FERNANDO',
    date: '13/03/2023',
    origin: 'RUA TORNADO CARAMELO',
    destination: 'RUA JUQUEIRA TRÊS NETO',
  },
];
const pageOptionsDto: PageOptionsDto = {
  page: 1,
  skip: 1,
  take: 10,
};
const deliveriesPage: PageDto<DeliveryEntity> = {
  data: deliveryEntityList,
  meta_data: {
    take: 10,
    page: 1,
    item_count: 2,
    page_count: 1,
    has_previous_page: false,
    has_next_page: false,
  },
};
describe('DeliveriesController', () => {
  let deliveriesController: DeliveriesController;
  let deliveriesService: DeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveriesController],
      providers: [
        {
          provide: DeliveriesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(deliveriesPage),
            create: jest.fn().mockResolvedValue(deliveryEntityList[0]),
          },
        },
      ],
    }).compile();

    deliveriesController =
      module.get<DeliveriesController>(DeliveriesController);
    deliveriesService = module.get<DeliveriesService>(DeliveriesService);
  });
  describe('create', () => {
    it('should create a delivery', async () => {
      const result = await deliveriesController.create(createDeliveryDto);

      expect(result).toBe(deliveryEntityList[0]);
    });
    it('should return an expection', async () => {
      jest
        .spyOn(deliveriesService, 'create')
        .mockRejectedValueOnce(new Error());

      expect(
        deliveriesService.create(createDeliveryDto),
      ).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should list all deliveries', async () => {
      const result = await deliveriesController.findAll(pageOptionsDto);

      expect(result).toEqual(deliveriesPage);
    });
    it('should return an expection', async () => {
      jest
        .spyOn(deliveriesService, 'findAll')
        .mockRejectedValueOnce(new Error());

      expect(deliveriesService.findAll(pageOptionsDto)).rejects.toThrowError();
    });
  });
});
