import React, { Suspense, lazy } from "react";
import { MantineProvider } from "@mantine/core";
import GlobalContextWrapper from "./utils/globalContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
const Generator = lazy(() => import("./pages/Generator"));

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/generated_result",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Generator />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        withCSSVariables
        theme={theme}
      >
        <GlobalContextWrapper>
          <RouterProvider router={router} />
        </GlobalContextWrapper>
      </MantineProvider>
    </>
  );
}

export default App;

const theme = {
  primaryColor: "blue",
  primaryShade: 5,
  defaultRadius: 4,
  components: {
    Title: {
      defaultProps: {
        color: "blueDark.8",
      },
    },
    Button: {
      defaultProps: {
        size: "md",
      },
    },
    Select: {
      defaultProps: {
        size: "md",
      },
    },
    MultiSelect: {
      defaultProps: {
        size: "md",
      },
    },
    TextInput: {
      defaultProps: {
        size: "md",
      },
    },
    NumberInput: {
      defaultProps: {
        size: "md",
      },
    },
  },

  breakpoints: {
    xs: "26em",
  },

  colors: {
    background: ["#ffffff"],
    foreground: ["#2a3239"],
    neutral: [
      "#fafafa",
      "#f9fafb",
      "#eef0f3",
      "#dfe3e7",
      "#aeb2b7",
      "#7b8186",
      "#5b6167",
      "#464e54",
      "#2a3239",
      "#121920",
    ],
    blue: [
      "#eff9fe",
      "#dff3fd",
      "#b9e7f9",
      "#7cd5f5",
      "#36c0ee",
      "#05a8de",
      "#0087bc",
      "#006b98",
      "#005b7f",
      "#004c6a",
    ],
    green: [
      "#effdf5",
      "#dbfde9",
      "#b7f9d3",
      "#79f3b0",
      "#11e384",
      "#00c769",
      "#00a454",
      "#008144",
      "#056638",
      "#0c5330",
    ],
    blueDark: [
      "#f8fafc",
      "#f5f7f9",
      "#e6eaee",
      "#d0d6dd",
      "#9aa4b1",
      "#697485",
      "#4a5565",
      "#354152",
      "#1f293a",
      "#0f172a",
    ],
  },
};
