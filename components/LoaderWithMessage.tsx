import { FormattedMessage } from "react-intl"

interface LoaderWitMessageProps {
  messageId: string
  isVisible: boolean
  textColor?: string
}

const LoaderWithMessage = ({ messageId, isVisible, textColor = "white" }: LoaderWitMessageProps) => (
  <div style={{ visibility: isVisible ? "visible" : "hidden" }} className="loader-with-message">
    <div className="loader" />
    <p style={{ color: textColor, marginLeft: "1rem" }}>
      <FormattedMessage id={messageId} />
    </p>
  </div>
)

export default LoaderWithMessage