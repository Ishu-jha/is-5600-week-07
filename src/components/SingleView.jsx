import React from 'react';
import { useParams } from 'react-router-dom';
import AddToCart from './AddToCart';
import '../App.css';

export default function SingleView({ data }) {
  const { id } = useParams();

  const product = data.find(
    (product) => product.id === id || product._id === id
  );

  if (!product) {
    return <div className="pa4">Product not found.</div>;
  }

  const { user, urls } = product;
  const title = product.description ?? product.alt_description;

  const style = {
    backgroundImage: `url(${urls?.regular || urls?.small})`
  };

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user?.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={user?.instagram_username || 'User'}
          />
          <h1 className="ml3 f4">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <p className="link dim lh-title">{title}</p>
        </div>

        <div className="gray db pv2">
          &hearts;<span>{product.likes}</span>
        </div>
      </div>

      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">${product.price}</span>
        <AddToCart product={product} />
      </div>
    </article>
  );
}