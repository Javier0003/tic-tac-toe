import styles from './styles.module.css'
import { useState } from 'react'
function App() {
  const [grid, setGrid] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const setChoice = (y: number, x: number, who?: string) => {
    setGrid((oldGrid) =>
      oldGrid.map((c, i) => {
        if (i === y) {
          return c.map((r, j) => {
            if (j === x) {
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

  const handleClick = (y: number, x: number) => {
    if (grid[y][x] === 'X') return
    setChoice(y, x, 'user')
    computerChoice(y, x)
  }

  const computerChoice = (y: number, x: number) => {
    const roll = computerRoll()
    if (roll[0] === y && roll[1] === x) return
    if (grid[roll[0]][roll[1]] === '') {
      setTimeout(() => {
        setChoice(roll[0], roll[1])
      }, 1000)
      return
    }
    computerChoice(y, x)
  }

  const computerRoll = () => {
    const c1: number = Math.floor(Math.random() * 2)
    const c2: number = Math.floor(Math.random() * 2)
    return [c1, c2]
  }

  return (
    <>
      <div className={styles.grid}>
        {grid.map((row, y) => (
          <div className={styles.row} key={`${y}_row`}>
            {row.map((rowItem, x) => (
              <div
                className={styles.rowItem}
                key={`${x}_rowItem`}
                onClick={() => handleClick(y, x)}
              >
                {rowItem}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
