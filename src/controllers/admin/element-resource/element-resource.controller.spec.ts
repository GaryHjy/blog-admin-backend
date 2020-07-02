import { Test, TestingModule } from '@nestjs/testing';
import { ElementResourceController } from './element-resource.controller';

describe('ElementResource Controller', () => {
  let controller: ElementResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElementResourceController],
    }).compile();

    controller = module.get<ElementResourceController>(ElementResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
