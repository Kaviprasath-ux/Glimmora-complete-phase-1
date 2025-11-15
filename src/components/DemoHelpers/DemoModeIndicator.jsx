import React from 'react';
import { PlayCircle } from 'lucide-react';
import styles from './DemoHelpers.module.css';

const DemoModeIndicator = () => {
  return (
    <div className={styles.demoModeIndicator}>
      <PlayCircle size={14} />
      <span>DEMO MODE</span>
    </div>
  );
};

export default DemoModeIndicator;
