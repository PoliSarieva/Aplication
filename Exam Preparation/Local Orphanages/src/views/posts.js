import { get, post, put, del } from "../data/api.js"

const endpoints = {
    catalog: '/data/posts?sortBy=_createdOn%20desc',
    byId: '/data/posts/'
}

export async function getPosts () {
    return get(endpoints.catalog);
}

export async function createPost (data) {
    return post(endpoints.byId, data)
}

export async function detailPost (id) {
    return get(endpoints.byId + id);
}

export async function editPost (id, data) {
    return put(endpoints.byId + id, data)
}

export async function deletePost (id) {
    return del(endpoints.byId + id)
}