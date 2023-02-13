import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOrder } from '../../shared/constants/page-order.enum';
import { PageOptionsDto } from '../../shared/dtos/page-options.dto';
import { DeliveriesService } from './deliveries.service';
import { DeliveryEntity } from './entities/delivery.entity';

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
const findAndCountRepositoryResponse = [deliveryEntityList, 3];
const findAllServiceResponse = {
  data: [
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
  ],
  meta_data: {
    page: 1,
    take: 10,
    item_count: 3,
    page_count: 1,
    has_previous_page: false,
    has_next_page: false,
  },
};

const pageOptionsDto: PageOptionsDto = {
  page: 1,
  order: PageOrder.ASC,
  skip: 1,
  take: 10,
};

const deliveryDto = {
  name: 'LEONARDO',
  date: '20/10/2000',
  origin: 'RUA MANOEL FRANCISCO',
  destination: 'RUA TIRADENTES',
};
const deliveryEntity = {
  id: 'gsagas',
  name: 'LEONARDO',
  date: '20/10/2000',
  origin: 'RUA MANOEL FRANCISCO',
  destination: 'RUA TIRADENTES',
};

describe('DeliveriesService', () => {
  let deliveryService: DeliveriesService;
  let deliveryRepository: Repository<DeliveryEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveriesService,
        {
          provide: getRepositoryToken(DeliveryEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(deliveryDto),
            save: jest.fn().mockResolvedValue(deliveryEntity),
            findAndCount: jest
              .fn()
              .mockResolvedValue(findAndCountRepositoryResponse),
          },
        },
      ],
    }).compile();

    deliveryService = module.get<DeliveriesService>(DeliveriesService);
    deliveryRepository = module.get<Repository<DeliveryEntity>>(
      getRepositoryToken(DeliveryEntity),
    );
  });
  it('should be defined', () => {
    expect(deliveryService).toBeDefined();
    expect(deliveryRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a deliveries list with pagination', async () => {
      const result = await deliveryService.findAll(pageOptionsDto);

      expect(result).toEqual(findAllServiceResponse);
      expect(deliveryRepository.findAndCount).toHaveBeenCalledTimes(1);
    });
    it('should return an expection', async () => {
      jest
        .spyOn(deliveryRepository, 'findAndCount')
        .mockRejectedValueOnce(new Error());

      expect(deliveryService.findAll(pageOptionsDto)).rejects.toThrowError();
    });
  });
  describe('create', () => {
    it('should create a new delivery', async () => {
      const result = await deliveryService.create(deliveryDto);

      expect(result).toEqual(deliveryEntityList[0]);
    });

    it('should return an expection', async () => {
      jest.spyOn(deliveryRepository, 'save').mockRejectedValueOnce(new Error());

      expect(deliveryService.create(deliveryDto)).rejects.toThrowError();
    });
  });
});
