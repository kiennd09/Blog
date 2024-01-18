/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ReduxProvider } from '../../redux/provider'
import { i18n, type Locale } from "../../i18n-config";
import { getDictionary } from '../../get-dictionary'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <ReduxProvider>
          <Header dictionary={dictionary['header']} params={params.lang} />
          <div>{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}