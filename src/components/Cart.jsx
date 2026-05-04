import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const { description, alt_description, _id, user, urls, likes } = props;

  const title = description ?? alt_description;

  return (
    <article className="fl w-100 w-50-m w-25-ns pa2">
      <Link to={`/product/${_id}`} className="db link dim tc">
        
        <div
          className="aspect-ratio aspect-ratio--1x1"
          style={{
            backgroundImage: `url(${urls?.regular})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="pa2">
          <h3 className="f6 mb1 black">{title}</h3>
          <p className="f7 gray ma0">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="f7 gray ma0">{likes} Likes</p>
        </div>

      </Link>
    </article>
  );
};

export default Card;