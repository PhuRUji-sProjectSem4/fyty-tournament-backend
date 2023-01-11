import { Test, TestingModule } from '@nestjs/testing';
import { JoinedService } from './joined.service';

describe('JoinedService', () => {
  let service: JoinedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinedService],
    }).compile();

    service = module.get<JoinedService>(JoinedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
