import styles from './styles.module.css'

interface GridProps {
  grid: string[][]
  handleClick: (y: number, x: number) => void
  theme: boolean
}

const Grid: React.FC<GridProps> = ({ grid, handleClick, theme }) => {
  return (
    <div className={styles.grid}>
      {grid.map((row, y) => (
        <div className={styles.row} key={`${y}_row`}>
          {row.map((rowItem, x) => {
            let icon: string[]
            switch (rowItem) {
              case 'X':
                icon = ['/lightX.png', '/darkX.png']
                break
              case 'O':
                icon = ['/oazul.png', '/oblancaa.png']
                break
              default:
                icon = ['', '']
                break
            }
            return (
              <div
                className={theme ? styles.darkRowItem : styles.rowItem}
                key={`${x}_rowItem`}
                onClick={() => handleClick(y, x)}
              >
                {!!icon[0].length && (
                  <img
                    src={theme ? icon[1] : icon[0]}
                    className={styles.icon}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
