# ElementInternals experimentation

This repo holds a simple, no-build example of using
[ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals)
to implement a simple form control which participates in the form around it,
setting validation state and things like that. It's intentionally pretty
minimal to just serve as a tool for documenting and explaining how this works,
and is heavily commented.

You can check it out online [here](https://custom-element-internals.vercel.app/) or
'run' it locally by doing:

```sh
npm i
npm start
```

This just starts a simple http serve in the directory, there's no build step
because this is just HTML and JS.

In the example the 'submit' button will log the current state of the form to
the console so you can check it out. Try inspecting the element, getting a
reference to the custom element and looking at its properties and methods, etc.
