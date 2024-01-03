import { useEffect } from 'react'
import styles from './styles.module.css'
interface CounterProps {
  player: number
  computer: number
  dark: () => void
  theme: boolean
}

const Counter: React.FC<CounterProps> = ({ player, computer, dark, theme }) => {
  const rendering = [
    { name: 'Player', value: player },
    { name: 'Computer', value: computer },
  ]
  useEffect(()=>{
    const bg = document.getElementById('bg')
    if(!theme){
      bg?.classList.remove('dark-background')
      bg?.classList.add('light-background');
      return
    }
    bg?.classList.remove('light-background')
    bg?.classList.add('dark-background');
  }, [theme])
  return (
    <div className={theme ? styles.darkContainer :styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Score:</h1>
        <input type='checkbox' onClick={dark} className={styles.swap}/>
      </div>
      {rendering.map((item, index) => (
        <div className={theme ? styles.darkCounter : styles.counter} key={`${index}_container`}>
          <p className={styles.name} key={`${index}_name`}>{`${item.name}:`}</p>
          <p
            className={theme? styles.darkScore : styles.score}
            key={`${index}_score`}
          >{`${item.value}`}</p>
        </div>
      ))}
    </div>
  )
}

export default Counter
