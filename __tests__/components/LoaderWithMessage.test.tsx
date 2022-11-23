import LoaderWithMessage from "../../components/LoaderWithMessage"
import { render } from "../../utilities/test-utils"

describe("LoaderWithMessage", () => {
  describe("Should match snapshot", () => {
    it("- invisible", () => {
      const { container } = render(<LoaderWithMessage isVisible={false} messageId="home.draw.loading" />)
      expect(container).toMatchSnapshot()
    })
    
    it("- visible", () => {
      const { container } = render(<LoaderWithMessage isVisible messageId="home.draw.loading" />)
      expect(container).toMatchSnapshot()
    })
  })

  it("Should display message", () => {
    const { container } = render(<LoaderWithMessage isVisible messageId="home.draw.loading" />)
    expect(container).toHaveTextContent("Drawing minifigs ...")
  })
})
