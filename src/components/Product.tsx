import React from 'react';
import { products } from '../constants/index';
import { uuid } from 'uuidv4';

type ProductListProp = {
    addCartItem: (id: number) => void;
}

function ProductList({ addCartItem } : ProductListProp) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => 
                        <tr key={ uuid() }>
                            <td>{ p.name }</td>
                            <td>{ p.price }</td>
                            <td><button onClick={() => addCartItem(p.id)}>Add</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;