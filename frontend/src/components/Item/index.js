import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as itemActions from '../../store/thunks/item';
import * as cartActions from '../../store/thunks/cart';
import './Item.css';

function Item() {
    const dispatch = useDispatch();
    const params = useParams();
    const item = useSelector(state => state.session.item);
    const cart = useSelector(state => state.session.cart);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(itemActions.getOneItem(params.itemId))
            .then(() => setIsLoaded(true))
    }, [dispatch, params.itemId]);

    if (!isLoaded) return null;

    function addToCart() {
        dispatch(cartActions.postOneCartItem({
            cartId: cart.cartDetails.id,
            itemId: item.id,
            quantity: Number(quantity),
        }));
    };

    return (
        <div className='main item'>
            <div id='item-gallery'>
                <img src={item.image} alt=''/>
            </div>
            <div id='item-details'>
                <p id='item-name'>{item.name}</p>
                <p id='item-description'>{item.description}</p>
                <p id='item-price'>${item.price}</p>
                <p id='item-stock'>{item.stock} left</p>
                <span>
                    <select onChange={e => setQuantity(e.target.value)}>{Array(item.stock).fill().map((_, idx) => (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                    ))}</select>
                    <button id='add-to-cart' onClick={addToCart}>Add to Cart</button>
                </span>
            </div>
        </div>
    );
};

export default Item;
