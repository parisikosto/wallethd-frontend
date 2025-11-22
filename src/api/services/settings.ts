import { axiosInstance } from '../axiosInstance';
import type {
  ApiGenericResponse,
  Settings,
  UpdateSettingsReqData,
} from '../interfaces';

const settingsUrl = '/v1/settings';

/**
 * @desc    Get settings
 * @route   GET /v1/settings
 * @access  Private
 */
export const getSettingsApi = async (): Promise<
  ApiGenericResponse<Settings>
> => {
  const res = await axiosInstance.get(settingsUrl);
  return res.data;
};

/**
 * @desc    Update settings
 * @route   PUT /v1/settings
 * @access  Private
 */
export const updateSettingsApi = async (
  data: UpdateSettingsReqData,
): Promise<ApiGenericResponse<Settings>> => {
  const res = await axiosInstance.put(settingsUrl, data);
  return res.data;
};
