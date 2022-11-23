import type { NextApiRequest, NextApiResponse } from 'next'
import { MinifigElement, MinifigPart } from '../../interfaces'

interface Response {
  data?: Array<MinifigPart>
  error?: Error
}

const getMinifigParts = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { setNum } = req.query
  const data = await fetch(`https://rebrickable.com/api/v3/lego/minifigs/${setNum}/parts`, {
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
      console.log("CAUGHT!", error)
      res.status(500).json({ error })
    })

  if (data?.results.length) {
    res.status(200).json({ data: (data.results as Array<MinifigElement>).map(part => part.part) })
  }
}

export default getMinifigParts