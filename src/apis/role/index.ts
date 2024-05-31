import { getApi, postApi } from "@/utils/request";


/**
 * 新增角色
 * @param data 
 * @returns 
 */
export const addRoleApi = (data: any) => {
    return postApi('/role', data)
}


/**
 * 分页查询角色
 * @param params 
 * @returns 
 */
export const queryRoleApi = (params: any) => {
    return getApi('/role', params)
}