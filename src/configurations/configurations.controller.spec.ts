import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationsController } from './configurations.controller';

describe('ConfigurationsController', () => {
  let controller: ConfigurationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationsController],
    }).compile();

    controller = module.get<ConfigurationsController>(ConfigurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
