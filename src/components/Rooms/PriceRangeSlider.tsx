import React, { useState, useEffect } from 'react';
import styles from './PriceRangeSlider.module.css';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(newMin);
    onChange([newMin, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(newMax);
    onChange([minValue, newMax]);
  };

  const getMinPercent = () => ((minValue - min) / (max - min)) * 100;
  const getMaxPercent = () => ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={styles.priceRangeSlider}>
      {/* Range Labels */}
      <div className={styles.rangeLabels}>
        <span className={styles.rangeLabel}>${min}</span>
        <span className={styles.rangeLabel}>${max}</span>
      </div>

      {/* Slider Container */}
      <div className={styles.sliderContainer}>
        {/* Track */}
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderRange}
            style={{
              left: `${getMinPercent()}%`,
              width: `${getMaxPercent() - getMinPercent()}%`,
            }}
          />
        </div>

        {/* Min Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className={`${styles.sliderInput} ${styles.sliderInputMin}`}
          style={{ zIndex: minValue > max - 100 ? 5 : 3 }}
        />

        {/* Max Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className={`${styles.sliderInput} ${styles.sliderInputMax}`}
        />
      </div>

      {/* Selected Range Display */}
      <div className={styles.selectedRange}>
        ${minValue} - ${maxValue}
      </div>
    </div>
  );
};

export default PriceRangeSlider;
