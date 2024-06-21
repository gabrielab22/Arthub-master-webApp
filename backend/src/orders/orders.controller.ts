import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { TimePeriodDto } from './dto/time-period.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('top-selling-artists')
  async getTopSellingArtists(@Query() timePeriodDto: TimePeriodDto) {
    return this.ordersService.getTopSellingArtists(timePeriodDto);
  }

  @Get(':userId')
  async getUserOrders(
    @Param('userId') userId: number,
  ): Promise<OrderResponseDto[]> {
    return this.ordersService.getUserOrders(userId);
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(+id, updateOrderDto);
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: string) {
    return this.ordersService.removeOrder(+id);
  }
}
