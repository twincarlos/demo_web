import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemActions from '../../store/thunks/item';
import * as cartActions from '../../store/thunks/cart';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.session.cart);
    const [itemQuantity, setItemQuantity] = useState(1);

    return (
        <div style={{ display: 'flex' }}>
            <input type='number' onChange={e => setItemQuantity(Number(e.target.value))}></input>
            {
                Object.values(cart.items).map(item => (
                    <div style={{ border: '1px solid black', padding: '10px' }} key={item.item.id}>
                        <p>{item.item.name}</p>
                        <p>{item.item.price}</p>
                        <p>{item.cartItem.quantity}</p>
                        <button onClick={() => {
                            dispatch(cartActions.putOneCartItem({ cartId: cart.cart.id, itemId: item.item.id, quantity: itemQuantity }));
                        }}>Update</button>
                        <button onClick={() => {
                            dispatch(cartActions.deleteOneCartItem({ cartId: cart.cart.id, itemId: item.item.id }))
                        }}>Remove</button>
                        <button onClick={() => {
                            dispatch(cartActions.deleteAllCartItems(cart.cart.id))
                        }}>Clear</button>
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
