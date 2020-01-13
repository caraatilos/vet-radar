import React from 'react';
import { CartItem } from '../datatypes/types';
import { products } from '../constants/index';
import { uuid } from 'uuidv4';

type CartListProps = {
    cartItemList: ReadonlyArray<CartItem>,
    removeCartItem: (id: number) => void
}

type CartItemView = CartItem & {
    name: string,
    price: number,
    total: number
}

function CartList({ cartItemList, removeCartItem }: CartListProps) {
    
    let priceTotal: number = 0;
    let cartView: ReadonlyArray<CartItemView> = [];
    cartItemList.forEach(c => {
        let product = products.find(p => p.id === c.productId);
        if (product) {
            let obj = { name: product!.name, price: product!.price, total: +(product!.price*c.quantity).toFixed(2) };
            cartView = [...cartView, { ...c, ...obj }];
            priceTotal += obj.total;
        }
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cartView.map(c => 
                        <tr key={uuid()}>
                            <td>{c.name}</td>
                            <td>{c.price}</td>
                            <td>{c.quantity}</td>
                            <td>{c.total}</td>
                            <td><button onClick={() => removeCartItem(c.productId)}>Remove Product</button></td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}></td>
                        <td>{priceTotal.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default CartList;