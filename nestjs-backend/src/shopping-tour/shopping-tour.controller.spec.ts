import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingTourController } from './shopping-tour.controller';

describe('ShoppingTourController', () => {
  let controller: ShoppingTourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingTourController],
    }).compile();

    controller = module.get<ShoppingTourController>(ShoppingTourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
