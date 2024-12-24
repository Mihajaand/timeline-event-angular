import { Test, TestingModule } from '@nestjs/testing';
import { EmployerController } from './employer.controller';

describe('EmployerController', () => {
  let controller: EmployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployerController],
    }).compile();

    controller = module.get<EmployerController>(EmployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
