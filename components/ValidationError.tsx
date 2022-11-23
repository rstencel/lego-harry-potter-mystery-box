interface ValidationErrorProps {
  error?: string
}

const ValidationError = ({ error }: ValidationErrorProps) => (
  <p className="error" style={{ visibility: error ? "visible" : "hidden"}}>
    {error}
  </p>
)

export default ValidationError