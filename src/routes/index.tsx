import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const Child = component$(() => {
  return (
    <>
      <div>
        hi again
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
