import { getApi, postApi } from "@/utils/request";


/**
 * Test
 * @param url 
 * @param data 
 * @returns 
 */
export const testApi = (data: any) => {
    return postApi('/permission', data)
}