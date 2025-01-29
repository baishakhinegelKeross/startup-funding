import { HighlightsProps } from './types';

const styles = {
  container: {
    padding: '1rem',
    maxWidth: '400px',
  },
  highlightCard: {
    background: 'linear-gradient(165deg, #1e1e2e 0%, #2d2d44 100%)',
    borderRadius: '16px',
    padding: '2rem',
    height: '290px', // Fixed height for all cards
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
    background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
    opacity: '0.7',
  },
  content: {
    position: 'relative' as const,
    zIndex: '1',
    flex: '1',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  titleContainer: {
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  icon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '0.025em',
    margin: '0',
    background: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
  },
  description: {
    color: '#a0aec0',
    lineHeight: '1.8',
    fontSize: '1rem',
    flex: '1',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical' as const,
    textOverflow: 'ellipsis',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  stats: {
    display: 'flex',
    gap: '1.5rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  statLabel: {
    color: '#718096',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  }
} as const;

const Highlights: React.FC<HighlightsProps> = ({title, desc}) => {
    return (
        <div style={styles.container}>
            <div 
                style={styles.highlightCard}
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
                    <div style={styles.titleContainer}>
                        <div style={styles.icon}>
                            <span style={{ color: '#ffffff', fontSize: '1.25rem' }}>★</span>
                        </div>
                        <h3 style={styles.title}>{title}</h3>
                    </div>
                    <p style={styles.description}>{desc}</p>
                    <div style={styles.footer}>
                        <div style={styles.stats}>
                            <div style={styles.stat}>
                                <span style={styles.statValue}>98%</span>
                                <span style={styles.statLabel}>Success</span>
                            </div>
                            <div style={styles.stat}>
                                <span style={styles.statValue}>24/7</span>
                                <span style={styles.statLabel}>Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Highlights;