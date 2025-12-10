import { NextRequest } from 'next/server';
import { handleError, successResponse } from '@/app/utils/common/serverResponse';
import { dashboardService } from '@/app/utils/services/dashBoardService';

export async function GET(request: NextRequest) {
  try {
    const data = await dashboardService.getDashboardData();
    return successResponse(data);
  } catch (error) {
    return handleError(error);
  }
}