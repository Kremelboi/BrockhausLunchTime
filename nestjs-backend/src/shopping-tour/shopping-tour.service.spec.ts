import {Test, TestingModule} from '@nestjs/testing';
import {ShoppingTourService} from './shopping-tour.service';

describe('ShoppingTourService', () => {
  let service: ShoppingTourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingTourService],
    }).compile();

    service = module.get<ShoppingTourService>(ShoppingTourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
