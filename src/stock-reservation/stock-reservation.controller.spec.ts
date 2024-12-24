import { Test, TestingModule } from '@nestjs/testing';
import { StockReservationController } from './stock-reservation.controller';

describe('StockReservationController', () => {
  let controller: StockReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockReservationController],
    }).compile();

    controller = module.get<StockReservationController>(StockReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
