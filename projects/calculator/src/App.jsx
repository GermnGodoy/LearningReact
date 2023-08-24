import { useState } from 'react'

const CalculatorCase = ({ children }) => {
  return (<div className='calculator-case'>
    {children}
  </div>
  )
}

const buttonTypes = {
  C : "C",
  P : "P",
  percentage : "%",
  divide : "÷",
  times : "×",
  minus : "-",
  plus : "+",
  equal: "=",
  decimalPoint : ".",
  mcm : "M",
  zero : 0,
  one : 1,
  two: 2,
  three : 3, 
  four : 4, 
  five : 5, 
  six : 6,
  seven : 7,
  eight : 8,
  nine : 9,

}

const Operations = {
  plus: (x,y) => (x,y) => {
    return x+y
  },
  times: (x,y) => (x,y) => {
    return x*y
  },
  minus: (x,y) => (x,y) => {
    return x-y
  }, 
  divide: (x,y) => (x,y) => {
    return x/y
  }

}

const Button = ({children, element, update}) => { 
  
  const handleClick = () => {
    update(element)
  }

  if (typeof(element) === 'number') { 
    return (
      <div onClick = {handleClick} className='calculator-button-number'>{children}</div>
    )
  } else { 
    return (
      <div onClick = {handleClick} className='calculator-button-operator'>{children}</div>
    )
  }
}

const CalculatorScreen = ({children}) => {
  return (
    <div className='calculator-case-screen'><div>{children}</div></div>
    //<div className='calculator-button-number'>{children}</div>
  )
}

const ButtonContainer = ({children}) => {
  return (
    <div className='button-container'>{children}</div>
  )
}

function App() {
  const [screen, setScreen] = useState( () => {
    return ''
  })

  const [operation, setOperation] = useState(null)

  const [memory, setMemory] = useState(null)

  const [rewrite, setRewrite] = useState(false)

  const buttonsArray = [buttonTypes.C, buttonTypes.P, buttonTypes.percentage , buttonTypes.divide,
    buttonTypes.seven,buttonTypes.eight,buttonTypes.nine,buttonTypes.times,
    buttonTypes.four,buttonTypes.five,buttonTypes.six,buttonTypes.minus,
    buttonTypes.one,buttonTypes.two,buttonTypes.three,buttonTypes.plus,
    buttonTypes.mcm,buttonTypes.zero,buttonTypes.decimalPoint,buttonTypes.equal]

  const fixNumberToScreen = (num) => {
    if (Math.floor(num).toString().length > 7) return num.toExponential(4 - num.toString().split('.')[0].length)
    else if (num % 1 !== 0 && num.toString().length >= 7) return num.toFixed(6 - num.toString().split('.')[0].length)
    
    let tooMuchZero = true
    if (num % 1 !== 0) {
      while (tooMuchZero) {
        if (num.toString().charAt(num.toString().length - 1) === '0') {
          num = num.toString().slice(0, num.toString().length - 1)
          num = num.includes('.') && parseFloat(screen) || parseInt(screen)
        } else if (num.toString().charAt(num.toString().length - 1) === '.') {
          num = parseInt(num)
        } else {
          tooMuchZero = false
        }
      }
    }

    return num
  }

  const updateCalculator = (btn) => {
    if (typeof(btn) === 'number') {
      if (rewrite) {
        setScreen(btn.toString())
        setRewrite(false)
      } else {
        if (screen.length >= 7) return 
        setScreen(screen + btn.toString())
      }
    } else if (btn === buttonTypes.C) {
      setScreen('')
      setMemory(null)
      setOperation(null)
    } else if (btn === buttonTypes.percentage) {
      let num = (parseFloat(screen)/100)
      num =  fixNumberToScreen(num)
      setScreen(num.toString())
    } else if (btn === buttonTypes.decimalPoint) {
      setScreen(screen + btn)
    } else if (btn === buttonTypes.plus) {
      if (!operation) {
        setMemory(screen)
        setScreen('')
        setOperation(Operations.plus)
        setRewrite(false)
      }else if (operation.toString() !== Operations.plus().toString()){
        setMemory(screen)
        setScreen('')
        setOperation(Operations.plus)
      }else {
        let mem = memory.toString().includes('.') && fixNumberToScreen(parseFloat(memory)) || fixNumberToScreen(parseInt(memory))
        let scr = screen.toString().includes('.') && fixNumberToScreen(parseFloat(screen)) || fixNumberToScreen(parseInt(screen))
        setScreen(fixNumberToScreen(operation(mem, scr)).toString())
        setMemory(fixNumberToScreen(operation(mem, scr)).toString())
        setOperation(Operations.plus)
        setRewrite(true)
      }
    } else if (btn === buttonTypes.minus) {
      if (!operation) {
        setMemory(screen)
        setScreen('')
        setOperation(Operations.minus)
        setRewrite(false)
      }else if (operation.toString() !== Operations.minus().toString()){
        setMemory(screen)
        setScreen('')
        setOperation(Operations.minus)
      }else {
        let mem = memory.toString().includes('.') && fixNumberToScreen(parseFloat(memory)) || fixNumberToScreen(parseInt(memory))
        let scr = screen.toString().includes('.') && fixNumberToScreen(parseFloat(screen)) || fixNumberToScreen(parseInt(screen))
        setScreen(fixNumberToScreen(operation(mem, scr)).toString())
        setMemory(fixNumberToScreen(operation(mem, scr)).toString())
        setOperation(Operations.minus)
        setRewrite(true)
      }
    } else if (btn === buttonTypes.times) {
      if (!operation) {
        setMemory(screen)
        setScreen('')
        setOperation(Operations.times)
        setRewrite(false)
      }else if (operation.toString() !== Operations.times().toString()){
        setMemory(screen)
        setScreen('')
        setOperation(Operations.times)
      }else {
        let mem = memory.toString().includes('.') && fixNumberToScreen(parseFloat(memory)) || fixNumberToScreen(parseInt(memory))
        let scr = screen.toString().includes('.') && fixNumberToScreen(parseFloat(screen)) || fixNumberToScreen(parseInt(screen))
        setScreen(fixNumberToScreen(operation(mem, scr)).toString())
        setMemory(fixNumberToScreen(operation(mem, scr)).toString())
        setOperation(Operations.times)
        setRewrite(true)
      }
    }else if (btn === buttonTypes.divide) {
      if (!operation) {
        setMemory(screen)
        setScreen('')
        setOperation(Operations.divide)
        setRewrite(false)
      }else if (operation.toString() !== Operations.divide().toString()){
        setMemory(screen)
        setScreen('')
        setOperation(Operations.divide)
      }else {
        let mem = memory.toString().includes('.') && fixNumberToScreen(parseFloat(memory)) || fixNumberToScreen(parseInt(memory))
        let scr = screen.toString().includes('.') && fixNumberToScreen(parseFloat(screen)) || fixNumberToScreen(parseInt(screen))
        setScreen(fixNumberToScreen(operation(mem, scr)).toString())
        setMemory(fixNumberToScreen(operation(mem, scr)).toString())
        setOperation(Operations.divide)
        setRewrite(true)
      }
    } else if (btn === buttonTypes.equal) {
      if (operation !== null) {
        let mem = memory.toString().includes('.') && fixNumberToScreen(parseFloat(memory)) || fixNumberToScreen(parseInt(memory))
        let scr = screen.toString().includes('.') && fixNumberToScreen(parseFloat(screen)) || fixNumberToScreen(parseInt(screen))
        setMemory(null)
        setScreen(fixNumberToScreen(operation(mem, scr)).toString())
        setOperation(null)
      }
    }
  }

  return (
    <main className="calculator">
      <h1> Calculator </h1>
      <CalculatorCase key = {1}>
        <CalculatorScreen>{screen}</CalculatorScreen>
        <ButtonContainer>
          {buttonsArray.map( (btn, index) => {
            return (
              <Button element = {btn} update = {updateCalculator} key = {index}>{btn}</Button>
            )
          })}
        </ButtonContainer>
      </CalculatorCase>
    </main>
  )
}

export default App
