import '@styles/global.css';

export const metadata = {
    title: "TempShare",
    description:"Share files for a temporarily"
}

const RootLayout = ({children}) => {
  return (
   <html lang='en'>
    <body>
    <div className='main' >
        <div className='background' />
    </div>
    <div className='container'>
        <main className='app'>
                {children}
        </main>
    </div>
    </body>
   </html>
  )
}

export default RootLayout