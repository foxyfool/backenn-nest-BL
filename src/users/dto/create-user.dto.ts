import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.USER,
    description: 'The role of the user',
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
