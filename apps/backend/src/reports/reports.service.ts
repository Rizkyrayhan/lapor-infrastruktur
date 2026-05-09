import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportQueryDto } from './dto/report-query.dto';
import { UpdateReportStatusDto } from './dto/update-report-status.dto';
import { Prisma } from '@prisma/client';

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

  async findAll(query: ReportQueryDto) {
    const { status, category, search, citizenId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ReportWhereInput = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (citizenId) where.citizenId = citizenId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
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
        skip,
        take: limit,
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        citizen: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }

    return report;
  }

  async updateStatus(id: string, updateReportStatusDto: UpdateReportStatusDto) {
    // Check if report exists
    await this.findOne(id);

    return this.prisma.report.update({
      where: { id },
      data: {
        status: updateReportStatusDto.status,
      },
    });
  }
}
