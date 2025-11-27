import React, { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useNavigate } from "react-router-dom";
import "../pages/home.css";

export default function Home() {
  const categories = [
    "All",
    "Dresses",
    "Kurtas",
    "Sarees",
    "Suits",
    "Ethnic Sets",
    "Tops",
    "Bottoms",
    "Lingerie",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <main className="layout home-layout">
      <aside className="sidebar">
        <h3>Trending / Categories</h3>

        <div className="cat-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${cat === activeCategory ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      <section className="content home-content">
        <div className="grid home-grid">
          {filtered.map((p, idx) => {

          const whatsappLink = `https://wa.me/918943293073?text=${encodeURIComponent(
  "Hello! I am interested in this product:\n\n" +
  "Title: " + p.title + "\n" +
  "Price: ₹" + p.price + "\n" +
  "Image: " + p.images[0] + "\n\n" +
  "Please provide more details."
)}`;


            return (
              <div
                key={p.id}
                className="card lr-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="card-badge">{idx + 1}</div>

                <div className="img-wrap lr-img">
                  <img src={p.images[0]} alt={p.title} />
                </div>

                <div className="overlay-title">
                  <div className="overlay-text">{p.title}</div>
                </div>

                <div className="rating-box">
                  <span className="rating-num">{p.rating}</span>
                  <span className="rating-star">★</span>
                  <span className="rating-count">| 4</span>
                </div>

                <div className="brand-tag">By Divine International Trading Co</div>

                <div className="card-footer">
                  
                  {/* PRICE */}
                  <div className="price-left">
                    <div className="price-now">₹{p.price}</div>
                  </div>

                  {/* ICONS */}
                  <div className="icons-right" onClick={(e) => e.stopPropagation()}>
                    
                    {/* Heart / Wishlist */}
                    <button
                      className="icon-btn heart"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Added to wishlist (demo)");
                      }}
                      aria-label="wishlist"
                    >
                      ♥
                    </button>

                    <a
  href={whatsappLink}
  target="_blank"
  rel="noreferrer"
  className="icon-btn whatsapp"
  onClick={(e) => e.stopPropagation()}
>
  🟢
</a>


                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="detail aside-empty" />
    </main>
  );
}
