import { handleError, successResponse } from '@/app/utils/common/serverResponse';
import { dashboardService } from '@/app/utils/services/dashBoardService';

export async function GET() {
  try {
    const data = await dashboardService.getDashboardData();
    return successResponse(data);
  } catch (error) {
    return handleError(error);
  }
}