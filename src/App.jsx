import React, { useState, useCallback, useRef } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.random() * str.length + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-600">
      <h1 className="text-white text-center my-3 text-xl">
        Password Generator
      </h1>
      <div
        className="flex shadow rounded-lg overflow-hidden mb-4
      "
      >
        <input
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          type="text"
          ref={passwordRef}
        />
        <button
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
          onClick={copyToClipBoard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            className="cursor-pointer"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            id="charInput"
          />
          <label htmlFor="charInput">Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default App;
