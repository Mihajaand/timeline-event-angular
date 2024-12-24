import { Test, TestingModule } from '@nestjs/testing';
import { StatutTicketService } from './statut_ticket.service';

describe('StatutTicketService', () => {
  let service: StatutTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatutTicketService],
    }).compile();

    service = module.get<StatutTicketService>(StatutTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
