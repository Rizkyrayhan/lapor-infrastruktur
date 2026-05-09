import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @GetUser('userId') userId: string,
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportsService.create(userId, createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
