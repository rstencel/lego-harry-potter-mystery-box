import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import MinifigCard from '../../components/MinifigCard'
import { Minifig } from '../../interfaces'
import styles from '../../styles/Draw.module.css'

const Draw = () => {
  const { formatMessage } = useIntl()
  const router = useRouter()

  const [drawnMinifigs, setDrawnMinifigs] = useState(Array<Minifig>)
  const [selectedMinifig, setSelectedMinifig] = useState<Minifig>()

  useEffect(() => {
    const sessionDrawnMinifigs = JSON.parse(
      sessionStorage.getItem(process.env.NEXT_PUBLIC_DRAWN_MINIFIGS_SESSION_STORAGE_KEY as string) ?? "null"
    )
    if (sessionDrawnMinifigs) {
      setDrawnMinifigs(sessionDrawnMinifigs)
    } else router.push("/")
  }, [router])

  const proceedToShipment = () => {
    sessionStorage.setItem(process.env.NEXT_PUBLIC_SELECTED_MINIFIG_SESSION_STORAGE_KEY as string, JSON.stringify(selectedMinifig))
    router.push("/cart")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{formatMessage({ id: "draw.title" })}</title>
        <meta name="description" content={formatMessage({ id: "app.description" })} />
        <link rel="icon" href="/lego-head.jpeg" />
      </Head>
      <main>
        <h1>
          <FormattedMessage id="draw.title" />
        </h1>
        <div className={styles.grid}>
          {drawnMinifigs?.map(minifig => (
            <MinifigCard
              key={minifig.set_num}
              minifig={minifig}
              isSelected={minifig === selectedMinifig}
              onClick={setSelectedMinifig}
            />
          ))}
        </div>
        <button onClick={proceedToShipment} disabled={!selectedMinifig}>
          <FormattedMessage id="draw.button" />
        </button>
      </main>
    </div>
  )
}

export default Draw
