export default function Home() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '16px',
          color: '#e0e0e0'
        }}>
          Bienvenue sur App Froid
        </h2>
        <p style={{ 
          color: '#9ca3af', 
          lineHeight: '1.6',
          marginBottom: '0'
        }}>
          Accédez instantanément à vos outils grâce à ce widget pratique, 
          disponible à tout moment dans votre navigateur !
        </p>
      </div>

      <div style={{
        backgroundColor: '#1e1e1e',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontWeight: '600',
          marginBottom: '12px',
          color: '#e0e0e0'
        }}>
          Outils disponibles :
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#9ca3af' }}>Réglette</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#9ca3af' }}>Test Azote</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#9ca3af' }}>DESP</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#3b82f6',
              borderRadius: '50%'
            }}></div>
            <span style={{ color: '#9ca3af' }}>CO₂ Trans.</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <a 
          href="https://buymeacoffee.com/mathieub"
          target="_blank"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#3b82f6';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Soutenir le projet
        </a>
      </div>
    </div>
  );
}