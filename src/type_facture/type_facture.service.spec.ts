import { Test, TestingModule } from '@nestjs/testing';
import { TypeFactureService } from './type_facture.service';

describe('TypeFactureService', () => {
  let service: TypeFactureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeFactureService],
    }).compile();

    service = module.get<TypeFactureService>(TypeFactureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
