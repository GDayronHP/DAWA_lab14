export const metadata = {
  title: "Inicio | Mi Sitio Web",
  description: "Bienvenido a Mi Sitio Web. Explora nuestros servicios y contenido de calidad.",
  openGraph: {
    title: "Inicio | Mi Sitio Web",
    description: "Explora nuestros servicios y contenido de calidad.",
    url: "https://mi-sitio.com/",
    type: "website",
    images: ["https://mi-sitio.com/og-image-home.png"],
  },
};

export default function HomePage() {
  return <h1>Bienvenido a la Página de Inicio</h1>;
}
