import { useDispatch } from "react-redux";
import * as orderActions from "../../store/thunks/order";

function Success() {
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.pathname);

    dispatch(orderActions.postOneOrder({
        userId: params.get('userId'),
        cartId: params.get('cartId'),
        userFirstName: 'Carlos',
        userLastName: 'Rodriguez',
        userEmail: 'twincarlos98@gmail.com',
        userPhoneNumber: '3053388415',
        confirmationNumber: params.get('stripeSessionId'),
        netTotal: params.get('netTotal')
    }));

    return (
        <div>
            Success!
        </div>
    );
};

export default Success;