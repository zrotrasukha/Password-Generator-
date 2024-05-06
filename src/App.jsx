import { useState, useCallback, useRef, useEffect } from "react";

function App() {

    const [length, setLength] = useState(8);
    const [numbersAllowed, setAllowedNumber] = useState(false);
    const [charAllowed, setAllowedChar] = useState(false);
    const [password, setPassword] = useState('')

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numbersAllowed) str += "0123456789"
        if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass);


    }, [length, numbersAllowed, charAllowed])
    const passwordRef = useRef(null)
    useEffect(() => {
        passwordGenerator()
    }, [length, numbersAllowed, charAllowed]
    )

    const copyPassToClip = useCallback(()=> {
        { 
            passwordRef.current?.select();
            passwordRef.current?.setSelectionRange(0, 999); 
            window.navigator.clipboard.writeText(password);  
        }
    }, [password])
    return (
        <>

            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
                <h1 className="text-center">Password Generator</h1>
                <div className="flex pt-2">
                    <input type="text"
                        value={password}
                        className="outline-none w-full py-1 px-3 rounded-l-lg"
                        placeholder="generating password..."
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-r-lg'
                        onClick={()=> {copyPassToClip()
                        }}  
                    >
                        copy
                    </button>
                </div>

                <div id="inputs" className="flex gap-2 pt-3">
                    <div className='flex text-sm gap-x-2 '>
                        <input type="range"
                            min={8}
                            max={100}
                            value={length}
                            onChange={(e) => { setLength(e.target.value) }}
                            id="lengthRange"
                            className="cursor-pointer" />
                        <label htmlFor="lengthRange">Length: {length}</label>
                    </div>

                    <div className='flex text-sm gap-x-2'>
                        <input type="checkbox"
                            defaultChecked={numbersAllowed}
                            id="numberInput"
                            onChange={() => {
                                setAllowedNumber((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>
                    <div className='flex text-sm gap-x-2'>
                        <input type="checkbox"
                            defaultChecked={charAllowed}
                            id="CharInput"
                            onChange={() => { setAllowedChar((prev) => !prev) }}
                        />
                        <label htmlFor="CharInput">Characters</label>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App; 