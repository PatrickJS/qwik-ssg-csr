import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  // ServiceWorkerRegister,
} from "@builder.io/qwik-city";
// import Index from "./routes/index";
import "./global.css";

export default component$(() => {
  return (
    // root needs to be a div
    <div id="fragment-root">
      {/* <Index /> */}
      {/* QwikCity needs head/body */}
      <QwikCityProvider>
        <RouterOutlet />
      </QwikCityProvider>
    </div>
  );
});
