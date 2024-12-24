import { Test, TestingModule } from '@nestjs/testing';
import { EvenementsService } from './evenements.service';

describe('EvenementsService', () => {
  let service: EvenementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvenementsService],
    }).compile();

    service = module.get<EvenementsService>(EvenementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
