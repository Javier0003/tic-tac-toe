import styles from './styles.module.css'
import { useState } from 'react'

function App() {
  const [grid, setGrid] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const choice = (y: number, x: number) => {
    const newGrid = grid.map((c, i) =>{
      if(i === y){
        return c.map((r, j) => {
          if(j === x){
            return 'X'
          }
          return r
        })
      }
      return c
    })
    return newGrid
  }

  const handleClick = (y: number, x: number) => {
    if(grid[y][x] === 'X') return
    const userChoice = choice(y, x)
    
    setGrid(userChoice)

    setTimeout(() =>{
      const c1 = Math.floor(Math.random() * 2)
      const c2= Math.floor(Math.random() * 2)
      if(grid[c1][c2] === 'X') return
      
    }, 1000)
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
