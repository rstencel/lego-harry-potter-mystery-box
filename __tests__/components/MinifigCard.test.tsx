import MinifigCard from "../../components/MinifigCard"
import { Minifig } from "../../interfaces"
import { render } from "../../utilities/test-utils"

describe("MinifigCard", () => {
  const mockMinifig: Minifig = {
    last_modified_dt: "",
    name: "Harry Potter",
    num_parts: 4,
    set_img_url: "https://test.com/test.jpg",
    set_num: "abc123",
    set_url: "https://test.com/abc123"
  }
  const mockOnClick = jest.fn()

  describe("Should match snapshot", () => {
    it("- default", () => {
      const { container } = render(<MinifigCard isSelected={false} minifig={mockMinifig} onClick={mockOnClick} />)
      expect(container).toMatchSnapshot()
    })
    
    it("- selected", () => {
      const { container } = render(<MinifigCard isSelected minifig={mockMinifig} onClick={mockOnClick} />)
      expect(container).toMatchSnapshot()
    })
  })

  it("Should display minifig\'s name", () => {
    const { container } = render(<MinifigCard isSelected={false} minifig={mockMinifig} onClick={mockOnClick} />)
    expect(container).toHaveTextContent(mockMinifig.name)
  })
})
