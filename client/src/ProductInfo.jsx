import React from 'react';
import StyleSelector from './StyleSelector.jsx';


const ProductInfo = ( {products, reviews, styles} ) => {
  const ratings = Object.values(reviews.ratings);
  //console.log(ratings)
  let stars = 0;
  for (let i = 0; i < ratings.length; i++) {
    stars += ratings[i];
  };
  stars = Math.floor(stars/ratings.length);
  //console.log(stars);
  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h2>Product Info</h2>
            <h3>Read all {ratings.length} Reviews</h3>
            <h3>Stars: {stars}</h3>
            <h3>Category: {product.category}</h3>
            <h1>{product.name}</h1>
            <h4>{product.default_price}</h4>
            <span>
              {product.slogan}
              <p>{product.description}</p>
            </span>
            <StyleSelector styles={styles}/>
            <h3>Share on Soical Media</h3>
            <button>FaceBook</button>
            <button>Twitter</button>
            <button>Pintrest</button>
          </div>
        )
      })}
    </div>
  )
}

export default ProductInfo;