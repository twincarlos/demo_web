import { useSelector } from 'react-redux';
import './Order.css';

function Orders() {
    const orders = useSelector(state => state.session.orders);

    if (!orders) return null;

    return (
        <div className='main orders'>
            {
                Object.values(orders).map(order => 
                    (<div className='order' key={order.id}>
                        <p>Order number: <b>{order.confirmationNumber}</b></p>
                        <p>Subtotal: <b>${order.netTotal}</b></p>
                        <p>Date: {new Date(order.createdAt).toDateString()}</p>
                        <span className='order-item-images'>
                            {
                                order.orderItems.map(orderItem => (
                                    <img src={orderItem.itemImage} key={orderItem.id} alt=''/>
                                ))
                            }
                        </span>
                    </div>)
                )
            }
        </div>
    );
};

export default Orders;