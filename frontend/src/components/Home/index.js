import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as itemActions from '../../store/thunks/item';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    const items = useSelector(state => state.session.items);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(itemActions.getAllItems())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!isLoaded) return null;

    return (
        <div className='main home'>
            {
                Object.values(items).map(item => (
                    <div className='item-container' key={item.id}>
                        <img src={item.image} alt='' onClick={() => history.push(`/item/${item.id}`)}/>
                        <div className='item-details'>
                            <p className='item-name'>{item.name}</p>
                            <p className='item-description'>{item.description}</p>
                            <p className='item-price'>${item.price}</p>
                            <p className='item-stock'>{item.stock} left</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
