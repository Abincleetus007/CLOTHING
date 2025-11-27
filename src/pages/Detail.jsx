import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import "../pages/detail.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) return <h2>Product Not Found</h2>;

  const [mainImage, setMainImage] = useState(product.images[0]);

  // WhatsApp message
  const whatsappLink = `https://wa.me/918943293073?text=${encodeURIComponent(
    `Hello! I am interested in this product:\n\n` +
      `Title: ${product.title}\n` +
      `Price: ₹${product.price}\n` +
      `Image: ${mainImage}\n\n` +
      `Please provide more details.`
  )}`;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="detail-layout">
        <div className="image-section">
          <div className="main-image-box">
            <img src={mainImage} alt={product.title} />
          </div>

          <div className="thumbnail-row">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2 className="title">{product.title}</h2>
          <p className="brand">Brand Divine International Trading Co</p>

          <div className="rating">⭐ {product.rating}</div>

          <div className="price-box">
            <p className="price">₹{product.price}</p>
          </div>

          <h3>Size</h3>
          <div className="size-box">FREE SIZE</div>

          <h3>Select Colour</h3>
          <div className="color-select">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="color-thumb"
                onClick={() => setMainImage(img)}
                alt="color"
              />
            ))}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            className="whatsapp-button"
            rel="noreferrer"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
