import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ description, alt_description, id, _id, user, urls, likes }) => {
  const productId = _id || id;
  const title = description ?? alt_description;

  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link to={`/product/${productId}`} className="db link dim tc">
        <div
          className="w-100 h4 cover"
          style={{
            backgroundImage: `url(${urls?.small || urls?.regular})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        <dl className="mt2 f6 lh-copy">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">
            {title}
          </dd>

          <dt className="clip">Artist</dt>
          <dd className="ml0 gray truncate w-100">
            {user?.first_name} {user?.last_name}
          </dd>

          <dt className="clip">Likes</dt>
          <dd className="ml0 gray truncate w-100">
            {likes} Likes
          </dd>
        </dl>
      </Link>
    </div>
  );
};

export default Card;