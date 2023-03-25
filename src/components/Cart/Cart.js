import { useContext } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = (props) =>{
    const cartCtx = useContext(CartContext);
    
    // const cartItems = 
    //     <ul className={styles['cart-items']}>{[{id: '1', name: 'Sushi', amount: 2, price: 12.99}].map(item => <li>{item.name}</li>)}</ul>;
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) =>{
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) =>{
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItems = (<ul className={styles['cart-items']}>
        {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id} 
                    name={item.name} 
                    price={item.price} 
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}/>
        ))}
        </ul>);
 
 
    return(
        <Modal onClose={props.onClose}>
            <div>
                {cartItems}
            </div>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;