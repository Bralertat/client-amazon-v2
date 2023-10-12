import { authAxios } from '@/api/api.interceptor'
import { IProduct, TypePaginationProducts } from '@/types/product.interface'
import {
  PRODUCTS,
  TypeProductData,
  TypeProductDataFilters
} from './product.types'

export const ProductService = {
  async getAll(queryData = {} as TypeProductDataFilters) {
    return authAxios<TypePaginationProducts>({
      url: PRODUCTS,
      method: 'GET',
      params: queryData
    })
  },

  async getSimilar(id: string | number) {
    return authAxios<IProduct[]>({
      url: `${PRODUCTS}/similar/${id}`,
      method: 'GET'
    })
  },

  async getBySlug(slug: string) {
    return authAxios<IProduct>({
      url: `${PRODUCTS}/by-slug/${slug}`,
      method: 'GET'
    })
  },

  async getByCategory(categorySlug: string) {
    return authAxios<IProduct[]>({
      url: `${PRODUCTS}/by-category/${categorySlug}`,
      method: 'GET'
    })
  },

  async getById(id: string | number) {
    return authAxios<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'GET'
    })
  },

  async create() {
    return authAxios<IProduct>({
      url: PRODUCTS,
      method: 'POST'
    })
  },

  async update(id: string | number, data: TypeProductData) {
    return authAxios<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'PUT',
      data
    })
  },

  async delete(id: string | number) {
    return authAxios<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'DELETE'
    })
  }
}
