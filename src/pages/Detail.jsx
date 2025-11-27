import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import "./detail.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) return <h2>Product Not Found</h2>;

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ⭐ FULLSCREEN STATE
  const [fullscreen, setFullscreen] = useState(false);

  // ⭐ Touch positions for swipe
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // WhatsApp message
  const whatsappLink = `https://wa.me/918943293073?text=${encodeURIComponent(
    "Hello! I am interested in this product:\n\n" +
    "Title: " + product.title + "\n" +
    "Price: ₹" + product.price + "\n" +
    "Image: " + mainImage + "\n\n" +
    "Please provide more details."
  )}`;

  // ⭐ Next & Previous Functions
  const nextImage = () => {
    const newIndex = (currentIndex + 1) % product.images.length;
    setCurrentIndex(newIndex);
    setMainImage(product.images[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentIndex(newIndex);
    setMainImage(product.images[newIndex]);
  };

  // ⭐ Swipe Detection for Mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      // SWIPE LEFT → NEXT IMAGE
      nextImage();
    } else if (distance < -50) {
      // SWIPE RIGHT → PREVIOUS IMAGE
      prevImage();
    }
  };

  // ⭐ Keyboard Navigation for Desktop
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "Escape") {
      setFullscreen(false);
    }
  };

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="detail-layout">
        {/* LEFT IMAGE SECTION */}
        <div className="image-section">
          <div
            className="main-image-box"
            onClick={() => setFullscreen(true)}
          >
            <img src={mainImage} alt={product.title} />
          </div>

          <div className="thumbnail-row">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => {
                  setMainImage(img);
                  setCurrentIndex(i);
                }}
                alt="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* RIGHT INFO */}
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
                onClick={() => {
                  setMainImage(img);
                  setCurrentIndex(i);
                }}
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
            📱 Contact on WhatsApp
          </a>
        </div>
      </div>

      {/* ⭐ FULLSCREEN IMAGE VIEWER - Like Flipkart */}
      {fullscreen && (
        <div
          className="fullscreen-overlay"
          onClick={() => setFullscreen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* LEFT ARROW for Desktop */}
          <button
            className="arrow-btn left-arrow"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ❮
          </button>

          {/* FULLSCREEN IMAGE */}
          <img
            src={product.images[currentIndex]}
            className="fullscreen-img"
            alt="fullscreen"
          />

          {/* RIGHT ARROW for Desktop */}
          <button
            className="arrow-btn right-arrow"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ❯
          </button>

          {/* IMAGE COUNTER */}
          <div className="image-counter">
            {currentIndex + 1} / {product.images.length}
          </div>

          {/* CLOSE BUTTON */}
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(false);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
