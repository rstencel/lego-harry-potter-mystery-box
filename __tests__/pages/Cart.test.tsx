import Cart from "@/pages/cart/index"
import { render } from "../../utilities/test-utils"
import fetchMock from "jest-fetch-mock"

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

beforeEach(() => {
  fetchMock.doMock()
})

describe("Cart", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Cart />)
    expect(container).toMatchSnapshot()
  })
})