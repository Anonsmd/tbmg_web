import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/newRecommend/list',
        method: 'get',
        params: params
    })
}

export function updateRecommendStatus(data) {
    return request({
        url: '/newRecommend/update/recommendStatus',
        method: 'post',
        data: data
    })
}

export function deleteNewProduct(data) {
    return request({
        url: '/home/newProduct/delete',
        method: 'post',
        data: data
    })
}

export function createNewProduct(data) {
    return request({
        url: '/home/newProduct/create',
        method: 'post',
        data: data
    })
}

export function updateNewProductSort(newRecommendId, productOrder) {
    return request({
        url: '/newRecommend/setOrder',
        method: 'post',
        data: {
            newRecommendId,
            productOrder
        }
    })
}