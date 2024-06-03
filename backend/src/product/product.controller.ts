import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: Prisma.ProductCreateInput): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.productService.updateProduct(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(+id);
  }
}
