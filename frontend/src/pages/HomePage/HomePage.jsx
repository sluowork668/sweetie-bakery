import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <main className={styles.homePage}>
      {/* Hero Section */}
      <header className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1>
              Artisan Bakery in Boston
              <br />
              Fresh Mochi Donuts, Pastries, and More
            </h1>

            <p className={styles.heroDescription}>
              Sweetie Bakery offers handcrafted mochi donuts, savory buns, and
              classic artisan breads. Browse our collection and explore the rich
              flavors of our local favorites.
            </p>

            <div className={styles.heroButtons}>
              <Link
                to="/menu"
                className={`${styles.heroButton} ${styles.primary}`}
                tabIndex="0"
                aria-label="Browse full bakery menu"
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Info Cards */}
      <section className={styles.homeInfoSection} aria-label="Bakery Features">
        <article className={styles.infoCard}>
          <h3>Freshly Made</h3>
          <p>
            Our menu includes mochi donuts, pastries, and artisanal breads
            prepared daily with high-quality, whole ingredients.
          </p>
        </article>

        <article className={styles.infoCard}>
          <h3>Local Favorite</h3>
          <p>
            Proudly serving the Boston community with unique flavors and a
            handcrafted touch.
          </p>
        </article>

        <article className={styles.infoCard}>
          <h3>Easy to Explore</h3>
          <p>
            Quickly browse our full menu, check allergen information, and see
            real-time availability.
          </p>
        </article>
      </section>

      {/* Bakery Credentials (Footer) */}
      <footer
        className={styles.footerCredentials}
        aria-label="Bakery Information"
      >
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h4>Visit Us</h4>
            <p>123 Bakery Lane</p>
            <p>Boston, MA 01234</p>
          </div>

          <div className={styles.footerSection}>
            <h4>Hours</h4>
            <p>Mon - Fri: 8am — 6pm</p>
            <p>Sat - Sun: 9am — 5pm</p>
          </div>

          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <p>hello@sweetiebakery.com</p>
            <p>(617) 123-4567</p>
          </div>
        </div>
        <p style={{ marginTop: '30px', fontSize: '0.8rem', opacity: 0.6 }}>
          © 2026 Sweetie Bakery Artisan Breads. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default HomePage;
