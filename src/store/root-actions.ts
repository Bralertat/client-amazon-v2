//именно так потому что санки, а не обычные actions
import * as userActions from './user/user.actions'
import { cartSlice } from './cart/cart.slice'

export const rootActions = {
  ...userActions,
  ...cartSlice.actions
}
