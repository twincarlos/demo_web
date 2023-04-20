import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as orderActions from '../../store/thunks/order';
import * as cartActions from '../../store/thunks/cart';

function Success() {
    const { stripeCheckoutId, cartId, userId, netTotal } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderActions.postOneOrder({
            userId,
            cartId,
            userFirstName: 'Carlos',
            userLastName: 'Rodriguez',
            userEmail: 'twincarlos98@gmail.com',
            userPhoneNumber: '3053388415',
            confirmationNumber: stripeCheckoutId,
            netTotal
        }))
            .then(res => res && dispatch(cartActions.deleteAllCartItems(cartId)))
    }, [cartId, dispatch, userId, stripeCheckoutId, netTotal]);

    return (
        <div>
            Success!
        </div>
    );
};

export default Success;
