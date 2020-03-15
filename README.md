# dudix tutorials
Tutorials for my son Aaron (and maybe others)

## Tutorial 1: simple HTML + CSS
<details><summary>Tutorial 1 is a simple html file, a css file and a ico.</summary>
The example shows how to organize a page with `<div>` tags.
We use `padding` and `box-sizing: border-box;` within the css to prettify the page.
</details>

see folder [html_1](./html_1/)

## Tutorial 2: ggt + kgV
<details><summary>Tutorial 2 is a plain Js implementation of the GCD ("ggT" in German) and LCM ("kgV" in German).</summary>
The exmaple implements the calculation accoring the aglorithm in my son's math book. It's not the best software engineering solution - but that was not the gloal...
</details>

see folder [ggTkgV](./ggTkgV/)

## Tutorial 3: Elevator
<details><summary>An elevator management system in node.js, RectJS and Boostrap 4.
Each Step is in a separate folder, so you can see the code of the step and run it.</summary>

To run it, go to folder and execute

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
 * a bit more intelligent mainController
 * ...

see folder [elevator/step6](./elevator/step6/)
</details>

## Tutorial 4
<details><summary>Tutorial 4 is a plain JS implementation of a 1x1 trainer.</summary>
A HTML page with JS displaying two numbers between 0 and 9. The user has to enter the product of both. The JS will test if the result is correct and displays a green or red indicator.
</details>

see folder [1x1](./1x1/)

## Tutorial 5
<details><summary>Tutorial 5 is a trainer to solve square equations. Written in JS.</summary>
A HTML page with JS displaying a square equation of type ax²+bx+c=d. The user has to enter the two solutions for x1 and x2. The JS will test if the result is correct and displays a green or red indicator.
</details>

see folder [square-eq](./square-eq/)

## Tutorial 6
let see...
