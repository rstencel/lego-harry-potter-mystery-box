import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import LoaderWithMessage from '../components/LoaderWithMessage'
import { showToast } from '../utilities/toast'

const Home = () => {
  const { formatMessage } = useIntl()
  const router = useRouter()

  const [isDrawing, setIsDrawing] = useState(false)

  const drawMinifigs = async () => {
    setIsDrawing(true)
    const drawnMinifigs = await fetch("/api/drawHarryPotterMinifigs").then((res) => res.json())
    if (drawnMinifigs?.data) {
      sessionStorage.setItem(process.env.NEXT_PUBLIC_DRAWN_MINIFIGS_SESSION_STORAGE_KEY as string, JSON.stringify(drawnMinifigs?.data))
      router.push({ pathname: "/draw" })
    } else if (drawnMinifigs?.error) {
      showToast(formatMessage({ id: "home.draw.loading.error" }), "error", router.reload)
    }
  }

  return (
    <>
      <Head>
        <title>{formatMessage({ id: "home.title" })}</title>
        <meta name="description" content={formatMessage({ id: "app.description" })} />
        <link rel="icon" href="/lego-head.jpeg" />
      </Head>
      <main>
        <h1>
          <FormattedMessage id="home.title" />
        </h1>
        <button style={{ marginBottom: "2rem" }} onClick={drawMinifigs} disabled={isDrawing}>
          <FormattedMessage id="home.draw.button" />
        </button>
        <LoaderWithMessage messageId="home.draw.loading" isVisible={isDrawing} />
      </main>
    </>
  )
}

export default Home