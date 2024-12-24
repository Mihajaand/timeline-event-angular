import { Test, TestingModule } from '@nestjs/testing';
import { OrchestrateurController } from './orchestrateur.controller';

describe('OrchestrateurController', () => {
  let controller: OrchestrateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrchestrateurController],
    }).compile();

    controller = module.get<OrchestrateurController>(OrchestrateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
