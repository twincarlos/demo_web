import { useSelector } from 'react-redux';

function Orders() {
    const orders = useSelector(state => state.session.orders);

    if (!orders) return null;

    return (
        <div>
            {
                Object.values(orders).map(order => 
                    (<div key={order.id}>
                        {
                            order.orderItems.map(orderItem => (
                                <div key={orderItem.id}>
                                    <p>{orderItem.itemName}</p>
                                    <p>{orderItem.itemQuantity} X ${orderItem.itemPrice} = {orderItem.netTotal}</p>
                                </div>
                            ))
                        }
                        <b>${order.netTotal}</b>
                    </div>)
                )
            }
        </div>
    );
};

export default Orders;