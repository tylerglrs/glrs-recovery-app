import './globals.css'

export const metadata = {
  title: 'GLRS Recovery Connect',
  description: 'Recovery connection and support app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}