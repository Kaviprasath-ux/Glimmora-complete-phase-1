import React from 'react';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className={styles.categoryTabsContainer}>
      <div className={styles.tabsWrapper}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
