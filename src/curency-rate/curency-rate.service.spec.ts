import { Test, TestingModule } from '@nestjs/testing';
import { CurencyRateService } from './curency-rate.service';

describe('CurencyRateService', () => {
  let service: CurencyRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurencyRateService],
    }).compile();

    service = module.get<CurencyRateService>(CurencyRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
