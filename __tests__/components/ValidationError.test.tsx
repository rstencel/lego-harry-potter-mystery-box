import { render } from "@testing-library/react"
import ValidationError from "../../components/ValidationError"

describe("ValidationError", () => {
  const mockError = "error"

  describe("Should match snapshot", () => {
    it("- hidden", () => {
      const { container } = render(<ValidationError error={undefined} />)
      expect(container).toMatchSnapshot()
    })
    
    it("- visible", () => {
      const { container } = render(<ValidationError error={mockError} />)
      expect(container).toMatchSnapshot()
    })
  })

  it("Should display error", () => {
    const { container } = render(<ValidationError error={mockError} />)
    expect(container).toHaveTextContent(mockError)
  })
})
