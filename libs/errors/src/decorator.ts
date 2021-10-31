import { UseFilters } from '@nestjs/common';
import { GrpcExceptionFilter } from './exception.filter';

export const CustomGrpcFilter = () => UseFilters(GrpcExceptionFilter);
