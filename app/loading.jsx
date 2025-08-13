export default function GlobalLoading() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(255,255,255,0.9)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 48, height: 48, margin: '0 auto 12px',
            border: '4px solid #e5e7eb', borderTopColor: '#ab9685',
            borderRadius: '50%', animation: 'spin 0.9s linear infinite'
          }}
        />
        <div style={{ letterSpacing: '.12em', fontWeight: 700, color: '#333' }}>
          LOADING…
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}