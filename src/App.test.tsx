import { render, screen, waitFor } from "@testing-library/react"
import App from "./App"
import { renderWithProviders } from "./utils/test-utils"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { Provider as ChakraProvider } from "@/components/ui/provider"
test("App should have correct initial render", () => {
  // renderWithProviders(<App />)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  renderWithProviders(
    // <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>,
    // </Provider>,
  )
  // The app should be rendered correctly
  expect(screen.getByTestId("form-test")).toBeInTheDocument()
})

test("After correct form submit app doesnt work correctly", async () => {
  // renderWithProviders(<App />)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  const { user } = renderWithProviders(
    // <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>,
    // </Provider>,
  )

  const formButton = screen.getByTestId("form-button-test")
  const formInput = screen.getByTestId("form-input-test")

  await user.click(formButton)
  expect(
    screen.getByText(
      "Valid URL example: https://github.com/exampleUser/exampleRepo",
    ),
  ).toBeInTheDocument()

  await user.clear(formInput)
  await user.type(formInput, "https://github.com/Chingis007/card_words_v2")
  await user.click(formButton)

  await waitFor(() =>
    expect(screen.getByText("Chingis007")).toBeInTheDocument(),
  )
  await waitFor(() =>
    expect(screen.getByText("card_words_v2")).toBeInTheDocument(),
  )
  await waitFor(() => expect(screen.getByText("ToDo")).toBeInTheDocument())
  await waitFor(() =>
    expect(screen.getByText("NewIssueInProgress")).toBeInTheDocument(),
  )
})
