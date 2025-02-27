import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
  title: "Promptopia",
  description: "Discover and share ai promptes"
}
const Root = ({children}) => {
  return (
    <html lang='en'>
        <body>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav/>
            {children}
          </main>
        </body>
    </html>
  )
}

export default Root