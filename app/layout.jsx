import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
  title: "Promptopia",
  description: "Discover and share ai promptes",
  icons: '/favicon.svg'
}
const Root = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default Root