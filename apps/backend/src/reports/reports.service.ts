import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(citizenId: string, createReportDto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        ...createReportDto,
        citizenId,
      },
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        citizen: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
