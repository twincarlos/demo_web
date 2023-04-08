import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemActions from '../../store/thunks/item';
import * as cartActions from '../../store/thunks/cart';

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.session.items);
    const cart = useSelector(state => state.session.cart);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(itemActions.getAllItems())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!isLoaded) return null;

    return (
        <div style={{ display: 'flex' }}>
            {
                Object.values(items).map(item => (
                    <div style={{ border: '1px solid black', padding: '10px' }} key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.stock}</p>
                        <button onClick={() => {
                            dispatch(cartActions.postOneCartItem({ cartId: cart.cartDetails.id, itemId: item.id, quantity: 1 }));
                        }}>Add to cart</button>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
