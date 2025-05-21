import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(category?: string): Promise<Product[]> {
    if (category) {
      return this.prisma.product.findMany({
        where: {
          category,
        },
        orderBy: {
          name: 'asc',
        },
      });
    }

    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findByAvailability(inStock: boolean): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        stockQty: inStock ? { gt: 0 } : { equals: 0 },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async searchByTags(tags: string[]): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
