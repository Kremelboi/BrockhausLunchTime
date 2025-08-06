import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ShoppingTourModule} from './shopping-tour/shopping-tour.module';
import {OrderModule} from './order/order.module';

@Module({
  imports: [ShoppingTourModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
