import { Test, TestingModule } from '@nestjs/testing';
import { TypeFactureController } from './type_facture.controller';

describe('TypeFactureController', () => {
  let controller: TypeFactureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeFactureController],
    }).compile();

    controller = module.get<TypeFactureController>(TypeFactureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
