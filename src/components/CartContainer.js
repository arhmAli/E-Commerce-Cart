import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartItem } from './CartItem'
import { openModal } from '../features/modal/modalSlice'


export const CartContainer = () => {
    const dispatch = useDispatch();
    const { cartItems, total, amount } = useSelector((store) => store.cart);
    if (amount < 1) {
        return <section>
            <header>
                <h2>Your Bag</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>
        </section>

    }
    return (
        <section>
            <h2>Your bag</h2>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />
                })}
            </div>
            <footer>
                <div className='cart-total'>
                    <hr />
                    <h4>
                        total<span>${total.toFixed(2)}</span>
                    </h4>
                </div>
                <button className='btn clear-btn'
                    onClick={() => dispatch(openModal())}>Clear cart</button>
            </footer>
        </section>
    )
}
