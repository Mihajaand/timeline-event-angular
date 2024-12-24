import { Test, TestingModule } from '@nestjs/testing';
import { FactureController } from './facture.controller';

describe('FactureController', () => {
  let controller: FactureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactureController],
    }).compile();

    controller = module.get<FactureController>(FactureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
