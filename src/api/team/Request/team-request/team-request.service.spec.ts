import { Test, TestingModule } from '@nestjs/testing';
import { TeamRequestService } from './team-request.service';

describe('TeamRequestService', () => {
  let service: TeamRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamRequestService],
    }).compile();

    service = module.get<TeamRequestService>(TeamRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
