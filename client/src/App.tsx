import { useState } from 'react'

const App = () => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mailer App</h1>
        
        <form className='flex flex-col gap-4'>
          <input 
            type="text" 
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="text" 
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Subject' 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
          />
          <textarea 
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            cols={30} 
            rows={10} 
            placeholder='Message' 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type='submit' 
            className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 font-medium transition-colors'
          >
            Send
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-primary text-white rounded">
          <p>Test custom primary color</p>
        </div>
        <div className="mt-2 p-4 bg-secondary text-white rounded">
          <p>Test custom secondary color</p>
        </div>
      </div>
    </div>
  )
}

export default App;