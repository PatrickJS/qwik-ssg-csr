import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const Weather = component$(() => {
  const csr = useSignal(false);
  const store = useStore({
    id: 1,
  });
  useVisibleTask$(() => {
    csr.value = true;
  });

  const todoResource = useResource$<any>(async ({ track, cleanup }) => {
    track(csr);
    if (!csr.value) {
      console.log("SSG");
      return;
    }
    const id = track(() => store.id);
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        signal: abortController.signal,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = res.json();
    return data;
  });

  return (
    <div>
      <input name="todo" onInput$={(ev: any) => (store.id = ev.target.value)} />
      <Resource
        value={todoResource}
        onResolved={(data) => {
          return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }}
        onPending={() => {
          return <div>Loading...</div>;
        }}
        onRejected={(err) => {
          return <div>{err.message}</div>;
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
