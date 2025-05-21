import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Eco-friendly Water Bottle',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Reusable water bottle made from recycled materials',
    description: 'The description of the product',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'The URL of the product image',
  })
  @IsUrl()
  @IsOptional()
  imageURL?: string;

  @ApiProperty({
    example: 100,
    description: 'The available stock quantity',
  })
  @IsInt()
  @Min(0)
  stockQty: number;

  @ApiProperty({
    example: ['eco-friendly', 'reusable', 'recycled'],
    description: 'Tags for the product',
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    example: 'Drinkware',
    description: 'The category of the product',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
