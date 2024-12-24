import { Test, TestingModule } from '@nestjs/testing';
import { FlagsController } from './flags.controller';

describe('FlagsController', () => {
  let controller: FlagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlagsController],
    }).compile();

    controller = module.get<FlagsController>(FlagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
