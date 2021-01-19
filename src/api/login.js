import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: '/admin/info',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/admin/logout',
        method: 'get'
    })
}

export function fetchList(params) {
    return request({
        url: '/admin/list',
        method: 'get',
        params: params
    })
}

export function fetchCustomerList(params) {
    return request({
        url: '/customer/list',
        method: 'get',
        params: params
    })
}

export function fetchCustomerInfoList(id) {
    return request({
        url: '/customer/info/' + id,
        method: 'get'
    })
}

export function createAdmin(data) {
    return request({
        url: '/admin/register',
        method: 'post',
        data: data
    })
}

export function updateAdmin(id, data) {
    return request({
        url: '/admin/update/' + id,
        method: 'post',
        data: data
    })
}

export function updateStatus(params) {
    return request({
        url: '/admin/updateStatus',
        method: 'post',
        data: params
    })
}

export function updateCustomerStatus(params) {
    return request({
        url: '/customer/updateStatus',
        method: 'post',
        data: params
    })
}

export function deleteAdmin(id) {
    return request({
        url: '/admin/delete/' + id,
        method: 'post'
    })
}

export function getRoleByAdmin(id) {
    return request({
        url: '/admin/role/' + id,
        method: 'get'
    })
}

export function allocRole(data) {
    return request({
        url: '/admin/role/update',
        method: 'post',
        data: data
    })
}