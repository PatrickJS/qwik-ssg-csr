import { Resource, component$, useResource$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const Weather = component$(() => {
  const store = useStore({
    city: "",
  });
 
  const weatherResource = useResource$<any>(async ({ track, cleanup }) => {
    const cityName = track(() => store.city);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(`http://weatherdata.com?city=${cityName}`, {
      signal: abortController.signal,
    });
    const data = res.json();
    return data;
  });
 
  return (
    <div>
      <input
        name="city"
        onInput$={(ev: any) => (store.city = ev.target.value)}
      />
      <Resource
        value={weatherResource}
        onResolved={(weather) => {
          return <div>Temperature: {weather.temp}</div>;
        }}
      />
    </div>
  );
});

export const Child = component$(() => {
  return (
    <>
      <div>
        hi again
        <Weather />
      </div>
    </>
  );
});

export default component$(() => {
  return (
    <>
      <div>
        hi
        <Child />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
