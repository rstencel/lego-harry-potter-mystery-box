import Draw from "@/pages/draw/index"
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

describe("Draw", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Draw />)
    expect(container).toMatchSnapshot()
  })
})