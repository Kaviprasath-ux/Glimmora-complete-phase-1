import React from 'react';
import { Check } from 'lucide-react';
import styles from './ProgressStepper.module.css';

interface Step {
  number: number;
  label: string;
  status: 'completed' | 'active' | 'inactive';
}

interface ProgressStepperProps {
  currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  const steps: Step[] = [
    {
      number: 1,
      label: 'Guest Details',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'inactive',
    },
    {
      number: 2,
      label: 'Payment',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'inactive',
    },
    {
      number: 3,
      label: 'Confirmation',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'inactive',
    },
  ];

  return (
    <div className={styles.stepperContainer}>
      <div className={styles.stepper}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className={styles.stepWrapper}>
              <div
                className={`${styles.stepCircle} ${
                  step.status === 'completed'
                    ? styles.completed
                    : step.status === 'active'
                    ? styles.active
                    : styles.inactive
                }`}
              >
                {step.status === 'completed' ? (
                  <Check size={24} strokeWidth={2} />
                ) : (
                  step.number
                )}
              </div>
              <div
                className={`${styles.stepLabel} ${
                  step.status === 'active' ? styles.activeLabel : ''
                }`}
              >
                {step.label}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.connector} ${
                  step.status === 'completed' || currentStep > step.number
                    ? styles.connectorActive
                    : ''
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
