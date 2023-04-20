import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/thunks/cart';
import * as orderActions from '../../store/thunks/order';
import './Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.session.cart);

    if (!cart) return null;

    const cartItemsArray = Object.values(cart.cartItems);

    return (
        <div className='main cart'>
            <div id='cart-items'>
                {
                    cartItemsArray.map(cartItem => (
                        <div className='cart-item' key={cartItem.id}>
                            <img src={cartItem.image} alt=''/>
                            <div>
                                <p>{cartItem.name}</p>
                                <p>${cartItem.price}</p>
                                <p>Qty: {cartItem.quantity}</p>
                                <button onClick={() => {
                                    dispatch(cartActions.deleteOneCartItem({ cartId: cart.cartDetails.id, itemId: cartItem.id }))
                                }}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id='cart-details'>
                <p>Subtotal ({cartItemsArray.length} items): <b>${cartItemsArray.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}</b></p>
                <button onClick={() => {
                    dispatch(cartActions.deleteAllCartItems(cart.cartDetails.id))
                }}>Clear</button>
                <button onClick={() => {
                    dispatch(orderActions.checkout(cart.cartDetails.id))
                        .then(stripeCheckout => window.location = stripeCheckout.url);
                }}>Check out</button>
            </div>
        </div>
    );
};

export default Cart;
