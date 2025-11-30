import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import "./home.css";

const CATEGORIES = ["All", "Suits", "Tops", "churidar material", "Bottoms", "Kurtas", "Sarees"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="layout home-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>Categories</h3>
        <div className="cat-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content home-content">
        <div className="home-grid">
          {filteredProducts.map((product, index) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="lr-card"
              style={{ textDecoration: "none" }}
            >
              {/* BADGE */}
              <div className="card-badge">{index + 1}</div>

              {/* IMAGE */}
              <div className="lr-img">
                <img src={product.images[0]} alt={product.title} />
              </div>

              {/* OVERLAY TITLE */}
              <div className="overlay-title">
                <span className="overlay-text">{product.title}</span>
              </div>

              {/* RATING */}
              <div className="rating-box">
                <span className="rating-star">⭐</span>
                <span>{product.rating}</span>
              </div>

              {/* BRAND */}
              <div className="brand-tag">Brand Divine International Trading Co</div>

              {/* FOOTER */}
              <div className="card-footer">
                <div className="price-left">
                  <span className="price-now">₹{product.price}</span>
                </div>

                <div className="icons-right">
                  <button
                    className="icon-btn heart"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Added to favorites!");
                    }}
                  >
                    ♥
                  </button>
                  <a
                    href={`https://wa.me/918943293073?text=${encodeURIComponent(
                      `Hello! I am interested in ${product.title} - ₹${product.price}`
                    )}`}
                    className="icon-btn whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📱
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* EMPTY ASIDE FOR LAYOUT */}
      <aside className="aside-empty"></aside>
    </div>
  );
}
