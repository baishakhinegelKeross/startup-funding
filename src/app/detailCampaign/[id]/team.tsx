import Image from 'next/image';
import React from 'react';
import { TeamMemberProps } from './types';

const styles = {
  teamCard: {
    background: 'linear-gradient(165deg, #1e1e2e 0%, #2d2d44 100%)',
    borderRadius: '24px',
    padding: '2.5rem',
    height: '400px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  glowEffect: {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    right: '0',
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
    opacity: '0.7',
  },
  content: {
    display: 'flex',
    gap: '2rem',
    height: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative' as const,
    width: '180px',
    height: '220px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
  },
  infoContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    marginBottom: '1.5rem',
  },
  name: {
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    background: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.025em',
  },
  title: {
    color: '#3b82f6',
    fontSize: '1.125rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  bio: {
    color: '#e2e8f0',
    fontSize: '1.125rem',
    lineHeight: '1.8',
    flex: '1',
    position: 'relative' as const,
    paddingLeft: '1.5rem',
    borderLeft: '2px solid rgba(59, 130, 246, 0.3)',
  },
  achievements: {
    display: 'flex',
    gap: '2rem',
    marginTop: '1.5rem',
    padding: '1.5rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  achievement: {
    flex: '1',
    textAlign: 'center' as const,
  },
  achievementValue: {
    color: '#3b82f6',
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  achievementLabel: {
    color: '#94a3b8',
    fontSize: '0.875rem',
    fontWeight: '500',
  }
} as const;

const TeamMember: React.FC<TeamMemberProps> = ({ teamMemberPic }) => {
  return (
    <div
      style={styles.teamCard}
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
      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <Image
            src={teamMemberPic}
            alt="Doron Kempel"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.header}>
            <h3 style={styles.name}>Doron Kempel</h3>
            <p style={styles.title}>Chief Executive Officer</p>
          </div>
          <p style={styles.bio}>
            Successful serial entrepreneur whose prior two startups were acquired for a combined value of ~$900,000,000. A former elite special ops commander, Doron advises leaders and heads of state on personal and national security. US citizen and Harvard MBA.
          </p>
          <div style={styles.achievements}>
            <div style={styles.achievement}>
              <div style={styles.achievementValue}>$900M+</div>
              <div style={styles.achievementLabel}>Previous Exits</div>
            </div>
            <div style={styles.achievement}>
              <div style={styles.achievementValue}>20+</div>
              <div style={styles.achievementLabel}>Years Experience</div>
            </div>
            <div style={styles.achievement}>
              <div style={styles.achievementValue}>Harvard</div>
              <div style={styles.achievementLabel}>MBA Graduate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;