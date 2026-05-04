import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateItemQuantity,
    getCartTotal
  } = useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="w-100 ba pa2">
              <thead>
                <tr>
                  <th className="tl pv2">Product</th>
                  <th className="tr pv2">Quantity</th>
                  <th className="tr pv2">Price</th>
                  <th className="tr pv2">Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => {
                  const title = item.description ?? item.alt_description;
                  const itemPrice = item.price ?? 0;

                  return (
                    <tr key={item._id || item.id}>
                      <td className="tl pv2">{title}</td>

                      <td className="tr pv2">
                        <button
                          className="pointer ba b--black-10 pv1 ph2 mr2"
                          onClick={() => updateItemQuantity(item._id || item.id, -1)}
                        >
                          -
                        </button>

                        {item.quantity}

                        <button
                          className="pointer ba b--black-10 pv1 ph2 ml2"
                          onClick={() => updateItemQuantity(item._id || item.id, 1)}
                        >
                          +
                        </button>
                      </td>

                      <td className="tr pv2">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </td>

                      <td className="tr pv2">
                        <button
                          className="pointer ba b--black-10 pv1 ph2"
                          onClick={() => removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="tr f4 mv3">
              Total: ${getCartTotal().toFixed(2)}
            </div>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-end pa3 mb3">
          <PurchaseForm />
        </div>
      )}
    </div>
  );
};

export default Cart;