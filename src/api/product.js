import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/product/list',
        method: 'get',
        params: params
    })
}

export function fetchSupplierList() {
    return request({
        url: '/product/supplierList',
        method: 'get'
    })
}

export function fetchWareHouseList() {
    return request({
        url: '/warehouse/infoList',
        method: 'get'
    })
}
export function fetchSimpleList(params) {
    return request({
        url: '/product/simpleList',
        method: 'get',
        params: params
    })
}

export function updateDeleteStatus(params) {
    return request({
        url: '/product/update/deleteStatus',
        method: 'post',
        params: params
    })
}

export function updateVerifyStatus(params) {
    return request({
        url: '/product/update/verifyStatus',
        method: 'post',
        data: params
    })
}

export function updateRecommendStatus(params) {
    return request({
        url: '/product/update/recommendStatus',
        method: 'post',
        params: params
    })
}

export function updatePublishStatus(params) {
    return request({
        url: '/product/update/publishStatus',
        method: 'post',
        data: params
    })
}

export function createProduct(data) {
    return request({
        url: '/product/createOrUpdate',
        method: 'post',
        data: data
    })
}

export function createWareHouse(data) {
    return request({
        url: '/warehouse/product/createOrUpdate',
        method: 'post',
        data: data
    })
}

export function updateProduct(id, data) {
    return request({
        url: '/product/update/' + id,
        method: 'post',
        data: data
    })
}

export function getProduct(id) {
    return request({
        url: '/product/updateInfo/' + id,
        method: 'get',
    })
}