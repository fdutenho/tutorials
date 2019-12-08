# dudix tutorials
Tutorials for my son Aaron (and maybe others)

## Tutorial 1: simple HTML + CSS
Tutorial 1 is a simple html file, a css file and a ico.
The example shows how to organize a page with `<div>` tags.
We use `padding` and `box-sizing: border-box;` within the css to prettify the page.

see folder [html_1](./html_1/)

## Tutorial 2: ggt + kgV
Tutorial 2 is a plain Js implementation of the GCD ("ggT" in German) and LCM ("kgV" in German).
The exmaple implements the calculation accoring the aglorithm in my son's math book. It's not the best software engineering solution - but that was not the gloal...

see folder [js_1](./js_1/)

## Tutorial 3: Elevator
An elevator management system in node.js, RectJS and Boostrap 4.
Each Step is in a separate folder, so you can see the code of the step and run it.

To run it, goto folder and execute

```
npm install
npm start
```

### Step 1: setup the system
Nothing spectacular, just the node.js + a basic "Hello World" React.js app.

see folder [elevator/step1](./elevator/step1/)

### Step 2:
Adding a "elevator" component with micromanagement functions like open and close door.

see folder [elevator/step2](./elevator/step2/)

### Step 3:
Adding some GUI elements for the elevator and let the elevator move.

see folder [elevator/step3](./elevator/step3/)

### Step 4:
Adding
 * a destination chooser for each elevator
 * a command stack for each elevator
 * a building with floors panels with "call the elevator"-buttons

see folder [elevator/step4](./elevator/step4/)

### Step 5:
Adding
 * a mainController to dispatch calls from the floors to the available elevators
 * a message broker in between "floors", "mainController" and "elevators" (use https://www.npmjs.com/package/postal)

see folder [elevator/step5](./elevator/step5/)

### Step 6:
Fine tuning
 * when to close/open a door
 * ...

see folder [elevator/step6](./elevator/step6/)


## Tutorial 4
let see...
