import Home from "@/pages/index"
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

describe("Home", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})