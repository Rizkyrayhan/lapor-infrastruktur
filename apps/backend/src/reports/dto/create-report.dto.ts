import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Judul laporan minimal harus 5 karakter' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Deskripsi masalah minimal harus 10 karakter' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Jalanan', 'Penerangan', 'Drainase', 'Sampah', 'Lainnya'], {
    message: 'Kategori laporan tidak valid',
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nama lokasi minimal harus 3 karakter' })
  location: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
