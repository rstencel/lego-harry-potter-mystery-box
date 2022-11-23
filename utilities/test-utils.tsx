import React, { FC, ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { IntlProvider } from "react-intl"
import messages from "../translations/en"

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <IntlProvider locale="en" defaultLocale="en" messages={messages}>
    {children}
  </IntlProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }