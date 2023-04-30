import React from 'react'
import "./app.css";

export default function Productlist({urun,price,calculatePromoCode}) {
  return (
    <div  className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
              <img src={urun.image} alt="w" />
            </div>
            <div className="product-details">
              <span className="product-catagory">{urun.category}</span>
              <h4>
                <a href="/">{urun.title}</a>
              </h4>
              <p>{urun.description}</p>
              <div className="product-bottom-details">
                <div className="product-price" >{price ? urun.price.toFixed(2) : <div className='product-price-discount'>{((1-calculatePromoCode())*urun.price).toFixed(2)}</div> } $</div>
                <div className="product-price">Stokta {urun.rating.count} adet</div>    
              </div>
            </div>
          </div>
  )
}
