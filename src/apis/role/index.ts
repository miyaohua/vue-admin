import { getApi, postApi, patchApi, deleteApi } from "@/utils/request";


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


/**
 * 修改角色
 * @param id 
 * @param data 
 * @returns 
 */
export const editRoleApi = (id: string, data: any) => {
    return patchApi(`/role/${id}`, data)
}



/**
 * 删除角色
 * @param id 
 * @returns 
 */
export const deleteRoleApi = (id: string) => {
    return deleteApi(`/role/${id}`)
}



/**
 * 根据权限分组获取所有权限
 * @param data 
 * @returns 
 */
export const getAllPermissionGroupApi = (data = {}) => {
    return postApi('/permission/permissionByGroup', data)
}