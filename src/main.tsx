import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { routeTree } from "./routeTree.gen";
import { createRouter } from '@tanstack/react-router'

import './index.css'
import "./styles/tailwind.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App router={router} />
    </StrictMode>,
  )
}