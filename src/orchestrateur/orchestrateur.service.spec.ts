import { Test, TestingModule } from '@nestjs/testing';
import { OrchestrateurService } from './orchestrateur.service';

describe('OrchestrateurService', () => {
  let service: OrchestrateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrchestrateurService],
    }).compile();

    service = module.get<OrchestrateurService>(OrchestrateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
