import React from 'react';
import { Wand2 } from 'lucide-react';
import styles from './DemoHelpers.module.css';

const AutoFillButton = ({ onClick, text = "Auto-fill Demo Data" }) => {
  return (
    <button
      className={styles.autoFillButton}
      onClick={onClick}
      type="button"
    >
      <Wand2 size={16} />
      <span>{text}</span>
    </button>
  );
};

export default AutoFillButton;
