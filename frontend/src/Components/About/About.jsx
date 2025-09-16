import React from 'react';
import './About.css';

import math1 from '@/assets/janamdin1.jpg';
import math2 from '@/assets/history1.jpg';
import math3 from '@/assets/history2.jpg';
import logo from '@/assets/Logo.png'; // ✅ Import Logo

const HistorySection = () => {
  return (
    <section className="history-section" id="about">
      
      {/* Hero Section */}
      <div className="history-hero">
        <img src={math1} alt="Ashram Heritage" className="history-hero-image" />
        <div className="history-hero-overlay"></div>
        <div className="history-hero-text">
          <h2>Our Glorious History</h2>
          <p>
            A divine journey spanning centuries of faith, devotion, and spiritual wisdom.
          </p>
        </div>
      </div>

      {/* Three Images Row */}
      <div className="history-images-row">
        <img src={math1} alt="Heritage 1" />
        <img src={math2} alt="Heritage 2" />
        <img src={math3} alt="Heritage 3" />
      </div>

      {/* Main Content */}
      <div className="history-content">
        <h3 className="section-heading">The Sacred Lineage</h3>
        <p>
          To eradicate the darkness of Kali-Yuga and restore the path of righteousness, the Supreme Lord incarnates again and again. Nearly fifteen centuries ago, one such divine play began in South India through the advent of Śrīmad Yamunacharya Jī, an exalted Vaishnava saint. His profound wisdom, steadfast devotion, renunciation, and loving respect for all beings made him a beacon for seekers.
        </p>
        <p>
          Gifted with extraordinary intellect, Śrī Rāmānujacharya Jī mastered the scriptures and composed the celebrated commentary on the Brahma-Sutras known as Viśiṣṭādvaita Vedānta. His compassion knew no bounds, and he broke social barriers to open the gates of spiritual knowledge for all. Out of mercy, he shared the sacred Nārāyaṇa Mantra with everyone, regardless of caste or creed.
        </p>
        <p>
          In the later centuries, Jagadguru Śrīmad 108 Rāmānanda Acharya Jī initiated a Bhakti movement in North India, whose illustrious disciples included Sant Ravidas and others. This divine flow continued through saints like Śrīmad Dāmodardās Jī Mahārāj and Śrīmad Swami Tulasidās Jī Mahārāj, culminating in the advent of Anantashrībhibhūṣita Thakur Śrī Sitaramdas Omkarnath Dev—a guiding light for humanity.
        </p>
        <p>
          To preserve this sacred tradition, Thakurji initiated eight foremost disciples into Tridandi Sannyasa. Among them was our most revered spiritual master—Tridandi Swami Parankusha Rāmānuj Jeeyar Mahārāj—who continues to guide us on the path of devotion and selfless service.
        </p>
        <p className="closing-line">
          Today, our Tribeni Ashram stands as a beacon of Dharma, illuminating lives through the eternal wisdom of our Acharyas.
        </p>

        {/* ✅ Logo Image Below Closing Line */}
        <div className="history-logo-wrapper">
          <img src={logo} alt="Ashram Logo" className="history-logo" />
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
