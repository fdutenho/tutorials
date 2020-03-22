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

### magic of the next() function

The `next()` function is a bit tricky as we want to have integer numbers a solutions for x1 and x2.

#### Standard pq-formula diff to our equation
Standard pq-formula is based on the equations

![pq](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20x%5E%7B2%7D&plus;px&plus;q%3D0)

and solves as

![x12](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20x_%7B1/2%7D%3D-%5Cfrac%7Bp%7D%7B2%7D%5Cpm%20%5Csqrt%7B%5Cleft%20%28%20%5Cfrac%7Bp%7D%7B2%7D%20%5Cright%20%29%5E%7B2%7D-q%7D)

Our approach is to ask to solve equations of type

![ax2](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20ax%5E%7B2%7D&plus;bx&plus;c%3Dd)

Which is basically only a modified standard
1. added a `d` on both sides
2. multiplied the whole equation by `a`

![ax-pq](https://latex.codecogs.com/png.latex?%5Cbg_white%20x%5E%7B2%7D%20&plus;%20%7B%5Ccolor%7BRed%7D%20%5Cfrac%7Bb%7D%7Ba%7D%7Dx%20&plus;%20%7B%5Ccolor%7BRed%7D%20%5Cfrac%7Bc-d%7D%7Ba%7D%7D%3D0)

so `p <=> b/a` and `q <=> (c-d)/a`


#### Ensure that the equation has two solutions
To ensure that an equation of this kind has two solutions, we have to
1. ensure that `c<>d` (this would resume in `ax²+bx=0` which is `x=-b/a`)
2. ensure that whatever is in the square root equation is `>0` (if `0` then we have one solution, if `<0` there is no solution)

for 1.: we let the random number generator for c and d generate random numbers between 1 and 10, do `c+d` is always greater than 2.

for 2.: we have to double check and modify b in case...

### Ensure that the equation has integer number as solutions

Well, that's the most tricky part in here.

Let's calculate backwards. If ![s1](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20x_%7B1/2%7D%3D-%5Cfrac%7Bp%7D%7B2%7D%20%5Cpm%20%5Csqrt%7B%3F%3F%3F%7D) should have integer numbers as solutions,
1. `p` has to be a multiplier of `2`
2. Whatever is in the square root has to be in `{1²,2²,3²,4²,5²,6²,7²,...}`

That makes our lives a bit easier ;-)

We introduce `ctemp` as a variable representing the result of the square root expression.
We can generate a random number for `ctemp`. And based on that number and the random numbers for `a` and `b` we can calculate `q` (and `c` and `d` of course).

![ctemp1](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20ctemp%20%3D%20%5Csqrt%7B%5Cleft%20%28%5Cfrac%7Bp%7D%7B2%7D%20%5Cright%20%29%5E%7B2%7D-q%7D) or ![ctemp2](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20ctemp%20%3D%20%5Csqrt%7B%5Cleft%20%28%5Cfrac%7Bb%7D%7B2*a%7D%20%5Cright%20%29%5E%7B2%7D-%20%28c-d%29%7D)

Formula for q is accordingly: ![q](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20q%20%3D%20%5Cleft%20%28%5Cfrac%7Bb%5E%7B2%7D%7D%7B4%20%5Ccdot%20a%7D%20%5Cright%20%29%20-%20%28ctemp%5E%7B2%7D%5Ccdot%20a%29)

or with `c` and `d`: ![cd](https://latex.codecogs.com/png.latex?%5Cdpi%7B100%7D%20%5Cbg_white%20%5Cfn_jvn%20c-d%20%3D%20%5Cleft%20%28%5Cfrac%7Bb%5E%7B2%7D%7D%7B4%20%5Ccdot%20a%7D%20%5Cright%20%29%20-%20%28ctemp%5E%7B2%7D%5Ccdot%20a%29)

We need to check if `q=0`. In this case we're cheating and modify b (assume that the random number for b was one number higher than is was actually).

#### Results
![x1](https://latex.codecogs.com/png.latex?%5Cbg_white%20x_%7B1%7D%20%3D%20-%5Cfrac%7Bb%7D%7B2%5Ccdot%20a%7D%20-%20ctemp)


![x2](https://latex.codecogs.com/png.latex?%5Cbg_white%20x_%7B2%7D%20%3D%20-%5Cfrac%7Bb%7D%7B2%5Ccdot%20a%7D%20&plus;%20ctemp)

</details>

see folder [square-eq](./square-eq/)

## Tutorial 6
let see...
