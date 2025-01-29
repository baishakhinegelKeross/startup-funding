import Image from 'next/image';
import React from 'react';
import { FeaturedInvestorProps } from './types';

const styles = {
  investorCard: {
    background: 'linear-gradient(165deg, #1e1e2e 0%, #2d2d44 100%)',
    borderRadius: '20px',
    padding: '2rem',
    height: '400px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
  },
  glowEffect: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    right: '0',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
    opacity: '0.7',
  },
  investorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  imageContainer: {
    position: 'relative' as const,
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  investorInfo: {
    flex: '1',
  },
  investorName: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    letterSpacing: '0.025em',
  },
  investorTitle: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  investmentAmount: {
    color: '#6366f1',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.025em',
  },
  comment: {
    color: '#e2e8f0',
    fontSize: '1rem',
    lineHeight: '1.75',
    marginBottom: '1.5rem',
    flex: '1',
  },
  readMore: {
    display: 'inline-flex',
    alignItems: 'center',
    color: '#6366f1',
    fontSize: '0.875rem',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '12px',
    background: 'rgba(99, 102, 241, 0.1)',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
    border: '1px solid rgba(99, 102, 241, 0.2)',
  }
} as const;

const FeaturedInvestor: React.FC<FeaturedInvestorProps> = ({
  investorPic,
  investorName,
  investorTitle,
  investmentAmt,
  investorCmt
}) => {
  return (
    <div
      style={styles.investorCard}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }}
    >
      <div style={styles.glowEffect}></div>
      <div style={styles.investorHeader}>
        <div style={styles.imageContainer}>
          <Image
            src={investorPic}
            alt={`${investorName}'s profile`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div style={styles.investorInfo}>
          <h3 style={styles.investorName}>{investorName}</h3>
          <p style={styles.investorTitle}>{investorTitle}</p>
        </div>
      </div>
      <p style={styles.investmentAmount}>{investmentAmt}</p>
      <p style={styles.comment}>{investorCmt}</p>
      <a
        href="#"
        style={styles.readMore}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Read More
      </a>
    </div>
  );
};

export default FeaturedInvestor;