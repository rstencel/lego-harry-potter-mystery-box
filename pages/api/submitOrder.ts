import type { NextApiRequest, NextApiResponse } from 'next'

const submitOrder = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Received order:", req.body)
  res.status(200).json({ message: "success" })
}

export default submitOrder