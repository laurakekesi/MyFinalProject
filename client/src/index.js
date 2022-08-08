import { createRoot } from 'react-dom/client';
import App from "./components/App";
import {ContextProvider} from "./context/Context";
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ContextProvider>
      <App />
    </ContextProvider>
);


