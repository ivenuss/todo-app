import { message } from 'antd';
import type { AxiosError } from 'axios';

export const handleErrorMessage = async (error: AxiosError) => {
  await message.error((error.response?.data as string) || error.message);
};
