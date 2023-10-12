import { ReviewService } from '@/services/review.services'
import { IProduct } from '@/types/product.interface'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
  // const { data: rating } = useQuery(
  //   ['get product rating', product.id],
  //   () => ReviewService.getAverageByProduct(product.id),
  //   { select: ({ data }) => data }
  // )
  const [rating, setRating] = useState<number>(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
    ) || 0
  )
  return (
    <div>
      <span>
        <Rating
          readonly
          initialValue={rating}
          SVGstyle={{ display: 'inline-block' }}
          size={34}
          allowFraction
          transition
        />
        <span style={{ color: 'yellow' }}>{rating}</span>
      </span>
      <span>({product.reviews.length} reviews)</span>
    </div>
  )
}

export default ProductRating
