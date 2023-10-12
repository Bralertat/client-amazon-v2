import { authAxios } from '@/api/api.interceptor'
import { IReview } from '@/types/review.interface'

const REVIEWS = 'reviews'

type TypeData = {
  rating: number
  text: string
}

export const ReviewService = {
  async getAll() {
    return authAxios<IReview[]>({
      url: REVIEWS,
      method: 'GET'
    })
  },

  async getAverageByProduct(productId: string | number) {
    return authAxios<number>({
      url: `${REVIEWS}/average-by-product/${productId}`,
      method: 'GET'
    })
  },

  async leave(productId: string | number, data: TypeData) {
    return authAxios<IReview>({
      url: `${REVIEWS}/leave/${productId}`,
      method: 'POST',
      data
    })
  }
}
