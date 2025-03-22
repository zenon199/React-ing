import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passGen = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if (number) str += "1234567890"
    if (char) str += "!@#$%^&*()_+"
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPass(pass)
  }, [length, number, char, setPass]);

  const passwordRef = useRef(null);

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(pass)
  }, [pass]);

  useEffect(() => {
    passGen()
  },[number, char, length, passGen])

  return (
    <div className='mt-40 flex flex-col items-center max-w-2xl mx-auto shadow-md rounded-lg px-4 py-12 my-8 bg-gray-700  text-white '>
      <h1 className='text-4xl my-4'>Password Generator</h1>
      <div className='flex my-3'>
        <input type='text' placeholder='password' readOnly value={pass}  ref={passwordRef}
          className='w-full py-1 px-4 outline-1 text-xl'
        />
        <button onClick={copyPassToClip}
          className='mx-5 px-3 py-1 rounded-2xl text-white bg-blue-700 shrink-0'>Copy</button>
      </div>
      <div className='my-3 flex items-center gap-4'>
        <input type='range' min={8} max={100} value={length} onChange={(e) => {setLength(e.target.value)}}
          className='cursor-pointer'
        />
        <input type='checkbox' id='numberInput' defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput">Number</label>
        <input type='checkbox' id='charInnput' defaultChecked={char}
          onChange={() => {
            setChar((prev) => !prev);
          }}
        />
        <label htmlFor='charInput'>Characters</label>
      </div>

    </div>
      
  )
}

export default App
