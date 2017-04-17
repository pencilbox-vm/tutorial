## Chart
This is a simple chart tutorial created with PencilBox.

### How to run the chart tutorial
1. Clone the [runtime](https://github.com/pencilbox-vm/runtime) repository and build `pencilbox-vm.js` and put it in this chart directory.
2. Clone the [pencilbox-py](https://github.com/pencilbox-vm/pencilbox-py) repository and put the files `compiler.py`, `definition.py` and `dsl.py` in this chart directory.
3. `python3 program.py > log`
4. Copy the first line(main part bytecodes) to replace the `bytecodes` content in `chart.js`.
5. Copy the second line(interactive part bytecodes) to replace the `interacitve_bytecodes` content in `chart.js`.
6. Run `chart.html` in browser.

### How to write a chart using PencilBox?

#### Step 1 : Basic HTML content
```html
<canvas id="main"></canvas>
<canvas id="interactive"></canvas>
```
We create 2 canvas HTML elements at first.
```javascript
var main_ctx = main.getContext('2d')
var interactive_ctx = interactive.getContent('2d')
```
And then we get both 2D canvas contexts of two.

#### Step 2 : Write PencilBox program
Just check the `program.py` file(also easy for .NET users to understand), there are detailed comments.

#### Step 3 : Run bytecodes
We get two pieces of bytecodes from Step 2, one is main chart bytecodes which we called `main_bytecodes`, the other is interactive chart bytecodes which we called `interactive_bytecodes`.

```javascript
var main_bytecodes = first_output_of_step2
var interactive_bytecodes = second_output_of_step2

var main_runtime = new PencilBox.Runtime(main_ctx)
var interactive_runtime = new PencilBox.Runtime(interactive_ctx)

main_runtime.interpret(main_bytecodes)

interactive_canvas.addEventListener('mousemove', function(e){
  // this env will be the global env object in interactive_runtime, and pass the position of mouse event into the runtime
  var env = {
    mouse_pos_x: e.pageX - interactive_canvas.parentNode.offsetLeft,
    mouse_pos_y: e.pageY - interactive_canvas.parentNode.offsetTop
  }

  interactive_runtime.interpret(interacitve_bytecodes, env)

  // codes below shows how to pass content from runtime to JavaScript environment(they share the same env).
  if (env.cursor_x)
    interactive_ctx.fillText(new Date(env.cursor_x[0] * 1000), env.cursor_x[1], env.cursor_x[2])

  if (env.cursor_y)
    interactive_ctx.fillText(env.cursor_y[0].toFixed(2), env.cursor_y[1], env.cursor_y[2])
})
```
We create 2 runtimes here for different use and each of them will be loaded their corresponding bytecodes. And we also use the `interactive_bytecodes` in `mousemove` event of the interactive canvas.
