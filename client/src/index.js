import { createRoot } from 'react-dom/client';
import App from "./components/App";
import {ContextProvider} from "./context/Context";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Auth0Provider
  domain="dev--gxsjzog.us.auth0.com"
  clientId="mjhPjtDzWRPAqISc63CfgduW9A5QNLgI"
  redirectUri={window.location.origin}>
    <ContextProvider>
      <App />
    </ContextProvider>
    </Auth0Provider>
);


