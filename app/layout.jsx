import '../styles/globals.css'
import Nav from '@/components/Nav'


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Nav /> 
        {children}
      </body>
      
    </html>
  )
}
