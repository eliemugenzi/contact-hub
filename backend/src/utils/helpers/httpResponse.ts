import { HttpStatus } from '@nestjs/common';

export interface HttpResponse {
  status: HttpStatus;
  message?: string;
  data?: any;
  meta?: {
    total: number;
    page: number;
    pages: number;
  };
  timestamp: string | Date;
}

interface IResponseData {
  status: HttpStatus;
  message?: string;
  data?: any;
  meta?: {
    total: number;
    page: number;
    pages: number;
  };
}

const httpResponse = (data: IResponseData): HttpResponse => ({
  ...data,
  timestamp: new Date().toISOString(),
});

export default httpResponse;
