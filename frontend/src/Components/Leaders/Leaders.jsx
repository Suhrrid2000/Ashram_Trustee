import React, { useState, useRef } from 'react';
import './Leaders.css';

import ramanuja1 from '@/assets/ramanuj_1.png';
import ramanuja2 from '@/assets/ramanuj_2.png';
import ramanuja3 from '@/assets/ramanuj_3.png';

import sitaram1 from '@/assets/sitaram.jpg';
import sitaram2 from '@/assets/sitaram1.jpg';
import sitaram3 from '@/assets/sitaram3.jpg';

import lakshman1 from '@/assets/lakshman1.jpg';
import lakshman2 from '@/assets/lakshman2.jpg';
import lakshman3 from '@/assets/lakshman3.jpg';

import parangkush1 from '@/assets/parangkush.jpg';
import parangkush2 from '@/assets/parangkush1.jpg';
import parangkush3 from '@/assets/parangkush2.jpg';

const leaders = [
  {
    name: 'Sree Ramanujacharya',
    photos: [ramanuja2, ramanuja1, ramanuja3],
    description: [
      'Sri Ramanujacharya, the radiant beacon of Bhakti and wisdom, stands as one of the greatest spiritual luminaries of Sanatan Dharma. Born in the 11th century, he descended upon this earth to re-establish the path of devotion and selfless service to the Supreme Lord Sriman Narayana. As the divine Acharya of the Vishishtadvaita philosophy, he harmonized knowledge, devotion, and surrender, guiding countless souls toward the eternal light of liberation. His life remains a sacred scripture in itself, inspiring seekers even today.',
      'In 1017 CE, in the holy town of Sriperumbudur, Tamil Nadu, the Lord blessed this world with the birth of Ramanuja. From childhood, his heart overflowed with devotion and his intellect sparkled with the light of the Vedas. His soul longed not for worldly pleasures but for the divine truth. Meeting the revered Guru Yamunacharya became the turning point of his life, where he resolved to dedicate every breath to the service of the Lord and the upliftment of suffering humanity. Renouncing all ego and attachment, he walked the path of humility, surrender, and divine love.',
      'The values of Sri Ramanujacharya were a fragrant garland woven with compassion, inclusiveness, and unshakeable faith in God. He proclaimed that the Lord belongs to all and all belong to the Lord, breaking the rigid walls of discrimination and granting equal spiritual rights to everyone. His teachings declared that Bhakti, strengthened by righteous living and humility, is the supreme path to Moksha. Through his discourses and writings, he unveiled the inner essence of the Vedas and Upanishads, making the highest truths blossom in the hearts of common devotees. His life was not just a philosophy—it was the music of divine surrender.',
      'For the protection and glory of Sanatan Dharma, Ramanujacharya traveled across the length and breadth of Bharat, carrying the torch of Bhakti in his compassionate hands. He organized temples into sacred centers of devotion, codified Agama Shastras, and ensured that temple doors remained open to all who sought the Lord with pure hearts. His tireless mission established the Pancharatra tradition and spread the Vishishtadvaita philosophy, planting the seeds of devotion that continue to bloom even after a thousand years. Truly, he was not just a teacher—he was the divine messenger of grace who led countless souls from darkness to the eternal light of Sriman Narayana.'
    ]
  },
  {
    name: 'Sree Sree Thakur Sitaram Das Omkarnath Deb',
    photos: [sitaram1, sitaram2, sitaram3],
    description: [
      'Our most revered, eternal, and illustrious Master is the infinitely adorned Thakur Sitaramdas Omkarnath Deva. He is the Divine Guru of our beloved founder, Tridandi Swami Parankush Ramanuja Jeeyar Maharaj. It is by walking on the sacred ideals and path shown by Him that this great spiritual and humanitarian mission was born—a mission that even today remains our eternal guiding light.',
      'This illustrious soul took birth in 1892 in the village of Keota, Hooghly district of West Bengal. His birth name was Prabodh Chandra Chattopadhyay. From childhood, he embodied both spiritual depth and profound compassion for humanity. At the tender age of five, he was blessed with the divine vision of Lord Shiva. Later, during his studies, the call of spiritual realization blossomed fully within him. He received initiation from the venerable Srimad Dasharathi Dev Yogeshwar Maharaj of Digsui, Hooghly, and devoted his life to the propagation of the Holy Name of God, which he considered the supreme path for the welfare of the world. Every divine act he performed—be it spiritual upliftment or service to humanity—was rooted in this sacred mission of Naam Prachar (spreading God’s Name).',
      'Upon entering the spiritual world, he was given the glorious name Sitaramdas Omkarnath Deva. On receiving the direct command of Lord Jagannath Himself, he leapt into an ocean of divine and humanitarian activities. He became a savior to the suffering, feeding countless souls during the devastating famine in Bengal. For days and months, he arranged food for lakhs of hungry people, as if the Lord Himself supplied the inexhaustible resources for his monumental task. His compassion knew no bounds—he established provisions for the education and sustenance of countless poor children, and ensured food, clothing, and shelter for the aged, destitute, and helpless. Across Bharat, he established innumerable monasteries, temples, organizations, and associations, through which this sacred mission of service continues even today. His core teaching was clear and profound: “True external welfare of society begins with the inner welfare of the soul.” Thus, he spread the divine name of the Lord across the world, so that all beings could attain the highest spiritual bliss.',
      'To ensure the continuity of this great mission, he entrusted eight of his foremost disciples to receive sannyasa from Srila Lakshan Ramanuja Jeeyar Maharaj, a venerable monk of the glorious Sri Vaishnava Sampradaya of Jagadguru Sri Ramanujacharya’s lineage. He himself was rooted in the Sri Vaishnava tradition, and he included his followers within that sacred lineage. Among those eight disciples was Tridandi Swami Parankush Ramanuja Jeeyar Maharaj, the revered founder of this very monastery.',
      'Thus, this Math stands as a humble yet glorious part of the vast spiritual and humanitarian legacy of Anantashree Thakur Sitaramdas Omkarnath Deva. We march forward holding his ideals as our eternal crown and his divine name as our guiding star. Anantashree Thakur is our inspiration, our strength, and our life. Having laid a perfect system for continuing his sacred mission, he concluded his earthly play in the year 1982, merging forever into the infinite light of the Supreme.'
    ]
  },
  {
    name: 'Sree Lakshman Ramanuja Jeeyar',
    photos: [lakshman2, lakshman1, lakshman3],
    description: [
      'Anantashree Vibhushita Thakur Sitaramdas Omkarnath Deva, the divine founder of the Akhil Bharat Jai Guru Sampradaya, embraced the sacred lineage of Sri Vaishnava Sampradaya through the holy association of the renowned Phalahari Jeeyar Matha at Srirangam. This holy Math was established by the illustrious 108 Sri Tridandi Swami Purushottam Ramanuja Jeeyar Maharaj, lovingly known to all as Phalahari Baba.',
      'In the glorious succession of this Math, the revered Acharya Tridandi Swami Srimad Lakshman Ramanuja Jeeyar Maharaj became the Mahant, the spiritual head. It was to his lotus feet that Thakur Sitaramdas Omkarnath brought eight of his chosen Brahmachari disciples in the year 1977, on the auspicious day of 7th February, for the sacred rite of Sannyasa Dīksha. From that moment, Srimad Lakshman Ramanuja Jeeyar Maharaj was honored as the Sannyasa Guru of the Sampradaya, thereby linking the Jai Guru lineage with the eternal Sri Vaishnava Parampara of Jagadguru Ramanujacharya.',
      'Endowed with profound mastery over Yoga, Tantra, sacred rituals, Vedic sacrifices, Ayurveda, and rare branches of spiritual sciences, the Sannyasa Guru was a living embodiment of wisdom and compassion. Through his yogic prowess, he uplifted countless lives—dispelling worldly afflictions, healing the distressed, and guiding countless souls from paths of error back to the radiance of righteousness. His life was a beacon of both temporal welfare and supreme spiritual emancipation.',
      'Born in 1929 in a pious Brahmin family at the small village of Nemawar near Indore, Madhya Pradesh, he came into this world as the youngest son of Sri Ram Joshi and Srimati Rampyari Bai Joshi, bearing the childhood name Pannalal Joshi. From birth, he carried the marks of yogic excellence—sitting naturally in Padmasana until the age of seven, a sign of deep samskaras from previous births. In his youth, he renounced home for learning, journeying across India’s sacred pilgrimages in the holy company of saints, acquiring boundless wisdom and spiritual strength.',
      'Eventually, at the divine abode of Phalahari Jeeyar Matha, he embraced Sri Vaishnava Sannyasa, receiving the tridanda and becoming a disciple of the venerable Tridandi Swami Srinivas Ramanuja Jeeyar Maharaj. Thus, he received the blessed name Tridandi Swami Srimad Lakshman Ramanuja Jeeyar Maharaj.',
      'After the divine disappearance of Thakur Sitaramdas Omkarnath Deva, the Sannyasa Guru often visited Bengal to bless his beloved disciple, Tridandi Swami Parankush Ramanuja Jeeyar Maharaj, and eventually made Bengal his permanent seat of grace at Sri Ramanuja Matha, where he spent his remaining days, showering love and wisdom until his final earthly moment.',
      'Gentle in heart, ever-smiling, full of love, simplicity, and magnanimity—such was the nature of Srimad Lakshman Ramanuja Jeeyar Maharaj. Far from the glare of publicity, he worked tirelessly for the welfare of the world, alleviating physical, mental, and spiritual sufferings of innumerable devotees across India and abroad. His selfless service and affectionate teachings remain our eternal ideal. In 2012, this great soul, a true saint of saints, withdrew from the mortal plane, leaving behind a legacy of compassion, wisdom, and divine inspiration.'     
    ]  
  },
  {
    name: 'Tridandi Swami Parangkush Ramanuja Jeeyar',
    photos: [parangkush1, parangkush2, parangkush3],
    description: [
      'Tridandi Swami Parankush Ramanuja Jeeyar Maharaj, the beloved and cherished spiritual son of Anantashree Thakur Sitaramdas Omkarnath Deva, was the very embodiment of absolute surrender to the Guru (Sri Guru Prapannata). His entire life stood as a shining example of Guru Seva—selfless and unwavering service at the lotus feet of his Master. With the power of surrender as his strength, he led countless souls toward the path of welfare and righteousness. Endowed with immense spiritual wealth, this great Mahatma dedicated his life for the good of others through unending Anna Daan (feeding the hungry), Naam Daan (spreading the Divine Name), and Prema Daan (showering divine love). Those who were blessed with his holy association testified in one voice that he was none other than an incarnation of love itself. Through his compassion, he removed the pangs of poverty and hunger for innumerable suffering beings.',
      'This saintly soul manifested on 5th September, 1933, in the village of Balidanga, Hooghly district, West Bengal, to pious parents Sri Rukmini Prasad Ghoshal and Smt. Leelavati Devi. His birth name was Sri Chintaharan Ghoshal. On 2nd January, 1947, he received initiation from the Supreme Master, Thakur Sitaramdas Omkarnath Deva, and from that day onward, his life became a joyous flow of Guru Seva. Whether it was the service of monasteries and temples, the care of sacred cows, or tending to the sick and destitute, he served tirelessly and lovingly. To the downtrodden and neglected, he became a divine shelter, embracing them with infinite compassion. Witnessing such brilliance of life and devotion, Thakur himself named him Kinkar Parananda. This pure soul, the very image of perfect Brahmacharya, was chosen by the Master for the highest order of renunciation. In accordance with this divine will, on 8th February, 1977, at Srimad Srirangam Falahari Jeeyar Math, he was ordained into the sacred order of Sannyasa by the venerable Tridandi Swami Lakshan Ramanuja Jeeyar Maharaj of the Sri Vaishnava Sampradaya. From that moment, Kinkar Parananda became Tridandi Swami Parankush Ramanuja Jeeyar, and with renewed vigor, he plunged into the vast ocean of spiritual and social welfare activities for the upliftment of all.',
      'From the very day of his renunciation, Swami Parankush dedicated every breath to the service of Dharma and humanity, establishing numerous maths and spiritual organizations to keep the flame of devotion and welfare ever burning. Through his limitless compassion and Guru-bhakti, he drew thousands into the light of the Divine. He was the very image of selfless service and an eternal fountain of love for his disciples, devotees, and the suffering. On 14th July, 2011, this noble soul shed his mortal frame, leaving behind not emptiness, but an everlasting legacy—a living tradition of Guru-seva, his established monasteries, countless disciples, and the path of surrender that continues to guide seekers toward the supreme goal.'
    ]
  }
];

const Leaders = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const containerRef = useRef(null);

  const scrollToContainer = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReadMore = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedLeader(index);
      setShowExpanded(true);
      setIsTransitioning(false);
      scrollToContainer();
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExpanded(false);
      setSelectedLeader(null);
      setIsTransitioning(false);
      scrollToContainer();
    }, 300);
  };

  if (showExpanded && selectedLeader !== null) {
    const leader = leaders[selectedLeader];
    const half = Math.ceil(leader.description.length / 2);
    const firstColumn = leader.description.slice(0, half);
    const secondColumn = leader.description.slice(half);

    return (
      <div
        ref={containerRef}
        className={`expanded-leader-view ${isTransitioning ? 'fade-out' : 'fade-in'}`}
      >
        <button className="back-btn fixed" onClick={handleBack}>
          ← Back To Grid View
        </button>

        {/* ✅ Image Row (instead of carousel) */}
        <div className="image-row-container">
          {leader.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${leader.name}-${index}`} className="detail-image" />
          ))}
        </div>

        {/* Description */}
        <div className="description-container">
          <h2>{leader.name}</h2>
          <div className="description-columns">
            <div>
              {firstColumn.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div>
              {secondColumn.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="leaders"
      ref={containerRef}
      className={`leaders-section ${isTransitioning ? 'fade-out' : 'fade-in'}`}
    >
      <h2 className="leaders-title">Our Paramparas</h2>
      <div className="leaders-grid">
        {leaders.map((leader, index) => (
          <div className="leader-card" key={index}>
            <img src={leader.photos[0]} alt={leader.name} className="leader-image" />
            <h3 className="leader-name">{leader.name}</h3>
            <p className="leader-desc">
              {Array.isArray(leader.description)
                ? `${leader.description[0].slice(0, 200)}...`
                : `${leader.description.slice(0, 200)}...`}
            </p>
            <button className="read-more-btn" onClick={() => handleReadMore(index)}>
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaders;
