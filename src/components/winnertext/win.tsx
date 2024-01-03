import styles from './styles.module.css'
interface WinProps {
  win: string
  restart: () => void
  theme: boolean
}
const Win: React.FC<WinProps> = ({ win, restart, theme }) => {
  return (
    <div className={theme ? styles.winDark : styles.win }>
      <h1>{win}</h1>
      <button onClick={restart} className={theme ? styles.btnDark : styles.btn}>restart</button>
    </div>
  )
}

export default Win
