// app/layout.tsx
import 'C:/Users/Pablo/Desktop/Aguila/styles/global.css'; // Si estás usando un archivo CSS global

export const metadata = {
  title: 'Noticias',
  description: 'Página de noticias',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
