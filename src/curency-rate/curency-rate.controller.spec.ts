import { Test, TestingModule } from '@nestjs/testing';
import { CurencyRateController } from './curency-rate.controller';

describe('CurencyRateController', () => {
  let controller: CurencyRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurencyRateController],
    }).compile();

    controller = module.get<CurencyRateController>(CurencyRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
