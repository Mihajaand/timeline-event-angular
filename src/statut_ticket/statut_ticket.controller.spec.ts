import { Test, TestingModule } from '@nestjs/testing';
import { StatutTicketController } from './statut_ticket.controller';

describe('StatutTicketController', () => {
  let controller: StatutTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatutTicketController],
    }).compile();

    controller = module.get<StatutTicketController>(StatutTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
