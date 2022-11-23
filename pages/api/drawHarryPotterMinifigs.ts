import type { NextApiRequest, NextApiResponse } from 'next'
import { Minifig } from '../../interfaces'

interface Response {
  data?: Array<Minifig>
  error?: Error
}

const HARRY_POTTER_THEME_ID = 246
const REBRICKABLE_API_ENDPOINT = `https://rebrickable.com/api/v3/lego/minifigs/?in_theme_id=${HARRY_POTTER_THEME_ID}`
const DRAWN_MINIFIGS_COUNT = 3

const drawHarryPotterMinifigs = async (_: NextApiRequest, res: NextApiResponse<Response>) => {
  const harryPotterMinifigs = new Array<Minifig>()
  let endpoint = REBRICKABLE_API_ENDPOINT

  do {
    const data = await fetch(endpoint, {
      method: "GET",
      headers: new Headers({
        Authorization: `key ${process.env.REBRICKABLE_API_KEY}`
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error()
        }
        return response.json()
      })
      .catch((error) => {
        res.status(500).json({ error })
      })

      endpoint = data?.next
      if (data?.results) {
        harryPotterMinifigs.push(...data.results)
      }
  } while (endpoint)

  if (harryPotterMinifigs?.length) {
    const drawnMinifigs = new Array<Minifig>()
    for (let i = 0; i < DRAWN_MINIFIGS_COUNT; i++) {
      drawnMinifigs.push(harryPotterMinifigs[Math.floor(Math.random() * (harryPotterMinifigs.length - 1))])
    }
    res.status(200).json({ data: drawnMinifigs })
  }
}

export default drawHarryPotterMinifigs