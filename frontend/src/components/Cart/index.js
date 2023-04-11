import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/thunks/cart';
import * as orderActions from '../../store/thunks/order';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.session.cart);
    const user = useSelector(state => state.session.user);
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
                    </div>
                ))
            }
            <button onClick={() => {
                dispatch(cartActions.deleteAllCartItems(cart.cartDetails.id))
            }}>Clear</button>
            <button onClick={() => {
                // const orderDetails = {
                //     cartId: cart.cartDetails.id,
                //     userId: user ? user.id : localStorage.getItem('userId'),
                //     userFirstName: 'Carlos',
                //     userLastName: 'Rodriguez',
                //     userEmail: 'twincarlos98@gmail.com',
                //     userPhoneNumber: '3053388415'
                // };
                // dispatch(orderActions.postOneOrder(orderDetails));
                dispatch(orderActions.checkout(cart.cartDetails.id))
                    .then(stripeCheckout => window.location = stripeCheckout.url);
            }}>Check out</button>
        </div>
    );
};

export default Cart;
