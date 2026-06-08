import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Terjadi kesalahan pada database';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        const target = (exception.meta?.target as string[]) || [];
        message = `Field ${target.join(', ')} sudah terdaftar`;
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Data yang Anda cari tidak ditemukan';
        break;
      default:
        status = HttpStatus.BAD_REQUEST;
        message = 'Permintaan database tidak valid';
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorCode: exception.code,
    });
  }
}
