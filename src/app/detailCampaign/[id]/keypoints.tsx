import React from 'react';
import { KeyPointsProps } from './types';

const styles = {
  keyPoint: {
    background: 'linear-gradient(169deg, #1a1b2e 0%, #232442 100%)',
    borderRadius: '16px',
    padding: '0 0 0 2rem',
    marginBottom: '1.5rem',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  },
  glow: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
    opacity: '0.7',
  },
  iconContainer: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    borderRadius: '12px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '48px',
    height: '48px',
    boxShadow: '0 8px 16px rgba(79, 172, 254, 0.3)',
    transition: 'all 0.3s ease',
  },
  icon: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  content: {
    flex: '1',
    minHeight: '100px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  category: {
    color: '#4facfe',
    fontSize: '0.875rem',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  categoryDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#4facfe',
  },
  description: {
    color: '#e2e8f0',
    fontSize: '1.125rem',
    lineHeight: '1.7',
    margin: '0',
    fontWeight: '400',
    letterSpacing: '0.015em',
  }
} as const;

const KeyPoints: React.FC<KeyPointsProps> = ({ desc, icon = '★', category = 'Key Insight' }) => {
  return (
    <div 
      style={styles.keyPoint}
      onMouseEnter={(e) => {
        const element = e.currentTarget;
        element.style.transform = 'translateY(-4px)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.05)';
        const iconContainer = element.querySelector('[data-icon-container]') as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = 'scale(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        const element = e.currentTarget;
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.05)';
        const iconContainer = element.querySelector('[data-icon-container]') as HTMLElement;
        if (iconContainer) {
          iconContainer.style.transform = 'scale(1)';
        }
      }}
    >
      <div style={styles.glow}></div>
      <div style={styles.iconContainer} data-icon-container>
        <span style={styles.icon}>{icon}</span>
      </div>
      <div style={styles.content}>
        <div style={styles.category}>
          <span style={styles.categoryDot}></span>
          {category}
        </div>
        <p style={styles.description}>{desc}</p>
      </div>
    </div>
  );
};

export default KeyPoints;