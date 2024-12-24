import { Test, TestingModule } from '@nestjs/testing';
import { StockReservationService } from './stock-reservation.service';

describe('StockReservationService', () => {
  let service: StockReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockReservationService],
    }).compile();

    service = module.get<StockReservationService>(StockReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
