import Navbar from './components/Navbar'
import SigninModal from './components/SigninModal'
import SignupModal from './components/SignupModal'
import AuthContext from './context/AuthContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />


      <body>
        <AuthContext>
          <Navbar />
          {/* <nav className="bg-white p-2 flex justify-between">
            <a href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </a>
            <div>
              <div className="flex">
                <SigninModal />
                <SignupModal />

              </div>
            </div>
          </nav> */}
          {children}
        </AuthContext>

      </body>
    </html>
  )
}
