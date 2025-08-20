import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import styles from './FaqAccordion.module.scss';

interface FaqItem {
  question: string;
  answerParts: string[];
}

const faqs: FaqItem[] = [
  {
    question: '§1 Allgemeines',
    answerParts: [
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    ],
  },
  {
    question: '§2 Paragraf 2',
    answerParts: [
      'Du kannst dich über unser Registrierungsformular mit deiner E-Mail-Adresse anmelden.',
      'Weitere Details findest du in unseren Nutzungsbedingungen.',
    ],
  },
  {
    question: '§3 Paragraf 3',
    answerParts: [
      'Ja, unsere App ist für iOS und Android verfügbar.',
      'Du kannst sie kostenlos im App Store bzw. Play Store herunterladen.',
    ],
  },
];

export const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number): void => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  return (
    <div
      className={styles.pageContainer}
      style={{
        backgroundImage: `url('/assets/img/backgroundimg.jpg')`,
      }}
    >
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Impressum</h1>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => toggleIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e, index)}
            aria-expanded={activeIndex === index}
          >
            <div className={styles.question}>
              <h3>{faq.question}</h3>
              <div className={styles.icon}>
                {activeIndex === index ? (
                  <Minus size={20} />
                ) : (
                  <Plus size={20} />
                )}
              </div>
            </div>

            {activeIndex === index && (
              <div className={styles.answer}>
                {faq.answerParts.map((part, i) => (
                  <p key={i}>{part}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
