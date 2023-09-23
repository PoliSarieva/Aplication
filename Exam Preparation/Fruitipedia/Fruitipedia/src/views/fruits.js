import { get, post, put, del } from "../data/api.js"

const endpoints = {
    catalog: '/data/fruits?sortBy=_createdOn%20desc',
    byId: '/data/fruits/',
    forSearch: '/data/fruits'
}

export async function getFruits() {
    return get(endpoints.catalog);
}

export async function addFruit (data) {
    return post(endpoints.byId, data);
}

export async function detailFruit (id) {
    return get(endpoints.byId + id);
}

export async function deleteFruit (id) {
    return del(endpoints.byId + id)
}

export async function editFruit (id, data) {
    return put(endpoints.byId + id, data)
}

export async function searchDetail(query) {
    return get(endpoints.forSearch + `?where=name%20LIKE%20%22${query}%22`)
}