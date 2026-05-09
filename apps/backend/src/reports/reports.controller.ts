import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { editFileName, imageFileFilter } from '../common/utils/file-upload.utils';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @GetUser('userId') userId: string,
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createReportDto.imageUrl = `/uploads/${file.filename}`;
    }
    return this.reportsService.create(userId, createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
