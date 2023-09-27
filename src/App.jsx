import { useState } from 'react'
import { numbers,upperCaseLetters,lowerCaseLetters,specialCharacters } from './characters'
import './App.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './Message'

function App() {
  const [password, setPassword] = useState('')
  const[passwordLength,setPasswordLength]=useState(20)
  const[includeUppercase,setIncludeUppercase]=useState(false)
  const[includeLowercase,setIncludeLowercase]=useState(false)
  const[includeNumbers,setIncludeNumbers]=useState(false)
  const[includeSymbols,setIncludeSymbols]=useState(false)

 const handleGeneratePassword=(e)=>{

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    notify('You must Select atleast one option', true)
  }
   let charactersList=''

   if(includeUppercase)
   {
    charactersList+=upperCaseLetters
   }
   if(includeLowercase)
   {
    charactersList+=lowerCaseLetters
   }
   if(includeNumbers)
   {
    charactersList+=numbers
   }
   if(includeSymbols)
   {
    charactersList+=specialCharacters
   }
   setPassword( createPassword(charactersList))
 }

 const createPassword=(charactersList)=>{
  let password=''
  const charactersListLength=charactersList.length

  for(let i=0;i<passwordLength;i++)
  {
    const characterIndex=Math.round(Math.random()* charactersListLength)
    password=password+charactersList.charAt(characterIndex)
  }
return password

 }
const copyToClipBoard=()=>{
  const newTextArea=document.createElement('textarea')
  newTextArea.innerText=password
  document.body.appendChild(newTextArea)
  newTextArea.select()
  document.execCommand('copy')
  newTextArea.remove()
}
const notify = (message, hasError = false) => {
  if (hasError) {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  } else {
    toast(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}




const handleCopyPassword=(e)=>{
  if(password ==="")
  {
    notify("Nothing To Copy",true)
  }
  else{

    copyToClipBoard()
    notify(COPY_SUCCESS)
  }
}





  return (
   <div className='App'>
    <div className='container'>
      <div className='generator'>
        <h2 className='generator__header'>
          Password Generator
        </h2>
          <div className="generator__password">
          <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy__btn'>
              <i className='far fa-clipboard'>

              </i>
            </button>
          </div>

          <div className='form-group'>
            <label htmlFor="password-strength">password Length</label>
            <input
            defaultValue={passwordLength} onChange={(e)=>{
              setPasswordLength(e.target.value)
            }}
            type="number" id='password-strength' name='password-strength' max='20' min='10' />
          </div>
          
          <div className='form-group'>
            <label htmlFor="uppercase-letter">Include UpperCase Letters</label>
            <input
            checked={includeUppercase}
            onChange={(e)=>{
              setIncludeUppercase(e.target.checked)
            }}
            type="checkbox" id='uppercase-letter' name='uppercase-letter'/>
          </div>
          
          <div className='form-group'>
            <label htmlFor="lowercase-letter">Include LowerCase Letters</label>
            <input
             checked={includeLowercase}
             onChange={(e)=>{
               setIncludeLowercase(e.target.checked)
             }}
            type="checkbox" id='lowercase-letter' name='lowercase-letter' />
          </div>

          <div className='form-group'>
            <label htmlFor="include-numbers">Include Numbers</label>
            <input 
             checked={includeNumbers}
             onChange={(e)=>{
               setIncludeNumbers(e.target.checked)
             }}
            type="checkbox" id='include-numbers' name='include-numbers' />
          </div>
          <div className='form-group'>
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
             checked={includeSymbols}
             onChange={(e)=>{
               setIncludeSymbols(e.target.checked)
             }}
            type="checkbox" id='include-symbols' name='include-symbols' />
          </div>
    
    <button  onClick={handleGeneratePassword}className='generator_btn'>Generate Password</button>

    <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </div>
    </div>
   </div>
  )
}

export default App
