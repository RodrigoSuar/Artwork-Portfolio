export default function ErrorPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#333' }}>404</h1>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#666' }}>Page not found</h2>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '30px' }}>
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}
