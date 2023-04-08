import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/thunks/cart';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.session.cart);
    const [itemQuantity, setItemQuantity] = useState(1);

    if (!cart) return null;

    return (
        <div style={{ display: 'flex' }}>
            <input type='number' onChange={e => setItemQuantity(e.target.value)}></input>
            {
                Object.values(cart.cartItems).map(cartItem => (
                    <div style={{ border: '1px solid black', padding: '10px' }} key={cartItem.id}>
                        <p>{cartItem.name}</p>
                        <p>{cartItem.price}</p>
                        <p>{cartItem.quantity}</p>
                        <button onClick={() => {
                            dispatch(cartActions.putOneCartItem({ cartId: cart.cartDetails.id, itemId: cartItem.id, quantity: Number(itemQuantity) }));
                        }}>Update</button>
                        <button onClick={() => {
                            dispatch(cartActions.deleteOneCartItem({ cartId: cart.cartDetails.id, itemId: cartItem.id }))
                        }}>Remove</button>
                        <button onClick={() => {
                            dispatch(cartActions.deleteAllCartItems(cart.cartDetails.id))
                        }}>Clear</button>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
