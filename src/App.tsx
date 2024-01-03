import Counter from './components/counter/counter'
import Grid from './components/grid/grid'
import Win from './components/winnertext/win'
import { useState, useEffect } from 'react'
type WinningCombination = [number, number][]
type CellValue = 'X' | 'O' | ''

function App() {
  const [win, setWin] = useState<string>('')
  const [turns, setTurns] = useState<number>(0)
  const [player, setPlayer] = useState<number>(0)
  const [computer, setComputer] = useState<number>(0)
  const [turn, setTurn] = useState<boolean>(true)
  const [lightMode, setLight] = useState<boolean>(false)
  const [grid, setGrid] = useState<CellValue[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])
  useEffect(() => {
    const winningCombinations: WinningCombination[] = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ]
    const isWinner: boolean = hasWinningCombination(grid, winningCombinations)
    const isLooser: boolean = computerHasWinningCombination(
      grid,
      winningCombinations
    ) 
    if (isWinner) {
      setPlayer((p) => p + 1)
      setWin('The Player Wins')
      setGrid([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ])
      return
    }
    if (isLooser) {
      setComputer((c) => c + 1)
      setWin('The Computer Wins')
      return
    }
  }, [grid])
  const setChoice = (y: number, x: number, who?: string) => {
    setGrid((oldGrid) =>
      oldGrid.map((c, i) => {
        if (i === y) {
          return c.map((r, j) => {
            if (j === x) {
              if (grid[y][x] === 'X') {
                computerChoice(y, x)
                return r
              }
              if (who === 'user') {
                return 'X'
              }
              return 'O'
            }
            return r
          })
        }
        return c
      })
    )
  }
  const hasWinningCombination = (
    array: CellValue[][],
    winningCombinations: WinningCombination[]
  ): boolean => {
    return winningCombinations.some((combination) => {
      return combination.every(([y, x]) => array[y][x] === 'X')
    })
  }

  const computerHasWinningCombination = (
    array: CellValue[][],
    winningCombinations: WinningCombination[]
  ): boolean => {
    return winningCombinations.some((combination) => {
      return combination.every(([y, x]) => array[y][x] === 'O')
    })
  }
  const restart = () =>{
    setWin('')
    setTurns(0)
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
  }
  const handleClick = (y: number, x: number) => {
    if (!turn) return
    if (win) return
    if (turns === 4) {
      setChoice(y, x, 'user')
      setWin('Draw')
      return
    }
    if (grid[y][x] === 'X' || grid[y][x] === 'O') return
    setTurns((t) => t + 1)
    setChoice(y, x, 'user')
    if (!win) computerChoice(y, x)
  }
  const swapTheme =() =>{
    setLight(l => !l)
  }
  const computerChoice = (y: number, x: number) => {
    const [c1, c2] = computerRoll()
    if (c1 === y && c2 === x) {
      computerChoice(y, x)
      return
    }
    if (grid[c1][c2] === '') {
      new Promise((res) => {
        setTurn(prev => !prev)
        setTimeout(() => {
          setChoice(c1, c2)
          res('a')
        }, 500)
      }).then(() => {
        setTurn(prev => !prev)
      })
      return
    }
    computerChoice(y, x)
  }

  const computerRoll = () => {
    const c1: number = Math.floor(Math.random() * 3)
    const c2: number = Math.floor(Math.random() * 3)
    return [c1, c2]
  }

  return (
    <>
      <Counter player={player} computer={computer} dark={swapTheme} theme={lightMode}/>
        {win ? (
          <Win win={win} restart={restart} theme={lightMode}/>
        ) : (
          <Grid grid={grid} handleClick={handleClick} theme={lightMode}/>
        )}
    </>
  )
}

export default App
