import {Module} from '@nestjs/common';
import {ShoppingTourService} from './shopping-tour.service';
import {ShoppingTourController} from './shopping-tour.controller';

@Module({
  providers: [ShoppingTourService],
  controllers: [ShoppingTourController],
  exports: [ShoppingTourService]
})
export class ShoppingTourModule {
}
