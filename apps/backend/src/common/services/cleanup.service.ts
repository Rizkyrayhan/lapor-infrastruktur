import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CleanupService {
  private readonly logger = new Logger(CleanupService.name);
  private readonly uploadsDir = path.join(process.cwd(), 'uploads');

  constructor(private readonly prisma: PrismaService) {}

  async cleanupOrphanedUploads(): Promise<number> {
    try {
      if (!fs.existsSync(this.uploadsDir)) {
        return 0;
      }

      const files = fs.readdirSync(this.uploadsDir);
      if (files.length === 0) {
        return 0;
      }

      const reports = await this.prisma.report.findMany({
        select: { imageUrl: true },
      });

      const dbImages = new Set(
        reports
          .map((r) => r.imageUrl)
          .filter((url): url is string => !!url)
          .map((url) => path.basename(url)),
      );

      let deletedCount = 0;

      for (const file of files) {
        if (file.startsWith('.')) {
          continue;
        }

        if (!dbImages.has(file)) {
          const filePath = path.join(this.uploadsDir, file);
          fs.unlinkSync(filePath);
          deletedCount++;
          this.logger.log(`Deleted orphaned upload: ${file}`);
        }
      }

      return deletedCount;
    } catch (error) {
      this.logger.error('Failed to cleanup orphaned uploads', error.stack);
      return 0;
    }
  }
}
