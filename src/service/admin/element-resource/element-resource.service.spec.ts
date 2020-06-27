import { Test, TestingModule } from '@nestjs/testing';
import { ElementResourceService } from './element-resource.service';

describe('ElementResourceService', () => {
  let service: ElementResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElementResourceService],
    }).compile();

    service = module.get<ElementResourceService>(ElementResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
