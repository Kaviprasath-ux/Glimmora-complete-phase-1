import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQAccordion.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What are your check-in and check-out times?',
    answer:
      'Check-in time is from 2:00 PM onwards, and check-out time is by 12:00 PM noon. Early check-in and late check-out are available upon request and subject to availability.',
  },
  {
    question: 'Do you offer airport transportation?',
    answer:
      'Yes, we provide complimentary airport shuttle service for our guests. Please inform us of your flight details at least 24 hours in advance so we can arrange the pickup.',
  },
  {
    question: 'Is parking available at the hotel?',
    answer:
      'We offer complimentary valet parking for all hotel guests. Self-parking is also available in our secure underground parking facility.',
  },
  {
    question: 'What are your cancellation policies?',
    answer:
      'Free cancellation is available up to 24 hours before your check-in date. Cancellations made within 24 hours of check-in may incur a one-night charge. Please refer to your booking confirmation for specific terms.',
  },
  {
    question: 'Do you accept pets?',
    answer:
      'Yes, we are a pet-friendly hotel! We welcome small to medium-sized pets with an additional fee of $50 per night. Please inform us in advance so we can prepare your room accordingly.',
  },
  {
    question: 'Are there any additional fees I should know about?',
    answer:
      'All room rates include complimentary WiFi, parking, and access to our fitness center. Additional charges may apply for spa services, room service, minibar items, and certain premium amenities.',
  },
  {
    question: 'How can I make a reservation?',
    answer:
      'You can make a reservation directly on our website, by calling our reservations team at +971 4 123 4567, or by emailing reservations@glimmora.com. We recommend booking in advance to ensure availability.',
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>Frequently Asked Questions</h2>

        <div className={styles.accordionContainer}>
          {faqData.map((faq, index) => (
            <div key={index} className={styles.accordionItem}>
              <div className={styles.questionHeader} onClick={() => toggleAccordion(index)}>
                <h3 className={styles.questionText}>{faq.question}</h3>
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className={`${styles.chevronIcon} ${
                    openIndex === index ? styles.chevronRotated : ''
                  }`}
                />
              </div>

              {openIndex === index && (
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
