import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductById(productId: number): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id: productId } });
  }

  async updateProduct(
    productId: number,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.prisma.product.update({ where: { id: productId }, data });
  }

  async deleteProduct(productId: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id: productId } });
  }
}
