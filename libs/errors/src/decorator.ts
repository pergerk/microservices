import { applyDecorators, UseFilters, UseInterceptors } from '@nestjs/common';
import { GrpcExceptionFilter, MetadataInterceptor } from './exception.filter';

export const CustomGrpcFilter = () =>
  applyDecorators(
    UseInterceptors(MetadataInterceptor),
    UseFilters(GrpcExceptionFilter),
  );
