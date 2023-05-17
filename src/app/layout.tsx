import './globals.css'
import { VT323 } from 'next/font/google'

const vt323 = VT323({ weight: ['400'], subsets: [] })

export const metadata = {
  title: "Conway's Game of Life",
  description: 'Simple automata of Game Of Life by Conway',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${vt323.className} w-full h-full text-green-500`}>{children}</body>
    </html>
  )
}
