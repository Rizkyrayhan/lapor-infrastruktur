import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReportStatus } from '@prisma/client';

export class UpdateReportStatusDto {
  @IsEnum(ReportStatus)
  @IsNotEmpty()
  status: ReportStatus;
}
