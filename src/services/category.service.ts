import { authAxios, guestAxios } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'

const CATEGORIES = 'categories'

export const CategoryService = {
  async getAll() {
    return guestAxios<ICategory[]>({
      url: CATEGORIES,
      method: 'GET'
    })
  },

  async getById(id: string | number) {
    return authAxios<ICategory>({
      url: `${CATEGORIES}/${id}`,
      method: 'GET'
    })
  },

  async getBySlug(slug: string) {
    return guestAxios<ICategory>({
      url: `${CATEGORIES}/by-slug/${slug}`,
      method: 'GET'
    })
  },

  async create() {
    return authAxios<ICategory>({
      url: CATEGORIES,
      method: 'POST'
    })
  },

  async update(id: string | number, name: string) {
    return authAxios<ICategory>({
      url: `${CATEGORIES}/${id}`,
      method: 'PUT',
      data: { name }
    })
  },

  async delete(id: string | number) {
    return authAxios<ICategory>({
      url: `${CATEGORIES}/${id}`,
      method: 'DELETE'
    })
  }
}
