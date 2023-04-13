import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as orderActions from '../../store/thunks/order';

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
        }));
    }, [dispatch]);

    return (
        <div>
            Success!
        </div>
    );
};

export default Success;
