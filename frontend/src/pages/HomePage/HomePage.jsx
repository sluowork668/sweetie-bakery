import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Artisan Bakery in Boston
              <br />
              Fresh Mochi Donuts, Pastries, and More
            </h1>

            <p className="hero-description">
              Sweetie Bakery is a small local bakery offering breads, pastries,
              desserts, and drinks. Browse our menu and explore our featured
              items made with a cozy, handcrafted touch.
            </p>

            <div className="hero-buttons">
              <Link to="/menu" className="hero-button primary">
                Explore Menu
              </Link>

              <Link to="/menu" className="hero-button secondary">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-info-section">
        <div className="info-card">
          <h3>Freshly Made</h3>
          <p>
            Our menu includes mochi donuts, pastries, breads, desserts, and
            drinks prepared with a warm bakery style.
          </p>
        </div>

        <div className="info-card">
          <h3>Local Favorite</h3>
          <p>
            We bring a cozy and modern bakery experience to customers looking
            for something sweet, soft, and memorable.
          </p>
        </div>

        <div className="info-card">
          <h3>Easy to Explore</h3>
          <p>
            Browse the menu, view product details, and manage products through
            our admin dashboard.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
