// app/not-found.js
export default function NotFound() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#ff4d4f" }}>
        404 - Página no encontrada
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        La página que buscas no existe o fue movida.
      </p>
      <a href="/" style={{
        padding: "0.8rem 1.5rem",
        backgroundColor: "#0070f3",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        Volver al inicio
      </a>
    </main>
  );
}
