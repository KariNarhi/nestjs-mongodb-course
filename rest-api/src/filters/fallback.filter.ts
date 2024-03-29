import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      'Fallback exception handler triggered',
      JSON.stringify(exception),
    );

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(500).json({
      statusCode: 500,
      createdBy: 'FallbackExceptionFilter',
      errorMessage: exception.message ?? 'Unexpected error occurred',
    });
  }
}
