import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as itemActions from '../../store/thunks/item';
import * as cartActions from '../../store/thunks/cart';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.session.items);
    const cart = useSelector(state => state.session.cart);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(1);

    useEffect(() => {
        dispatch(itemActions.getAllItems())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!isLoaded) return null;

    return (
        <div className='main home'>
            {/* <input type='number' onChange={e => setItemQuantity(e.target.value)}></input> */}
            {
                Object.values(items).map(item => (
                    <div className='item-container' key={item.id}>
                        <img src={item.image} alt=''/>
                        <h3>{item.name}</h3>
                        <h6>${item.price}, ${item.stock} in stock</h6>
                        <button onClick={() => {
                            dispatch(cartActions.postOneCartItem({ cartId: cart.cartDetails.id, itemId: item.id, quantity: Number(itemQuantity) }));
                        }}>Add to cart</button>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
