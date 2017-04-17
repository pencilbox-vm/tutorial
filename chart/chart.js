
var main_canvas = document.getElementById('main-canvas')
var interactive_canvas = document.getElementById('interactive-canvas')

main_canvas.width = interactive_canvas.width = 960
main_canvas.height = interactive_canvas.height = 480

var main_ctx = main_canvas.getContext('2d')
var interactive_ctx = interactive_canvas.getContext('2d')

var main_runtime = new PencilBox.Runtime(main_ctx)
var interactive_runtime = new PencilBox.Runtime(interactive_ctx)

var bytecodes = new Uint8Array(
[16, 4, 1, 0, 0, 49, 0, 52, 0, 112, 0, 120, 0, 32, 0, 72, 0, 101, 0, 108, 0, 118, 0, 97, 0, 116, 0, 105, 0, 99, 0, 97, 0, 44, 0, 32, 0, 65, 0, 114, 0, 105, 0, 97, 0, 108, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 48, 0, 44, 0, 32, 0, 48, 0, 44, 0, 32, 0, 50, 0, 53, 0, 53, 0, 44, 0, 32, 0, 48, 0, 46, 0, 56, 0, 41, 0, 3, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 48, 0, 44, 0, 32, 0, 49, 0, 50, 0, 56, 0, 44, 0, 32, 0, 49, 0, 50, 0, 56, 0, 44, 0, 32, 0, 48, 0, 46, 0, 56, 0, 41, 0, 3, 0, 50, 0, 48, 0, 49, 0, 55, 0, 45, 0, 48, 0, 52, 0, 45, 0, 49, 0, 55, 0, 32, 0, 49, 0, 50, 0, 58, 0, 49, 0, 52, 0, 58, 0, 51, 0, 54, 0, 3, 0, 50, 0, 48, 0, 49, 0, 55, 0, 45, 0, 48, 0, 52, 0, 45, 0, 49, 0, 55, 0, 32, 0, 49, 0, 51, 0, 58, 0, 53, 0, 51, 0, 58, 0, 51, 0, 54, 0, 3, 0, 48, 0, 46, 0, 48, 0, 3, 0, 56, 0, 54, 0, 46, 0, 48, 0, 49, 0, 57, 0, 49, 0, 56, 0, 49, 0, 54, 0, 57, 0, 53, 0, 51, 0, 53, 0, 56, 0, 48, 0, 51, 0, 3, 0, 1, 3, 0, 57, 1, 1, 3, 1, 69, 1, 1, 3, 2, 56, 1, 3, 50, 8, 0, 64, 215, 67, 95, 2, 5, 142, 3, 8, 0, 64, 215, 67, 93, 2, 105, 0, 1, 3, 3, 3, 50, 5, 188, 1, 88, 3, 1, 3, 4, 5, 142, 3, 1, 3, 4, 94, 1, 37, 5, 188, 1, 88, 3, 8, 0, 160, 99, 68, 3, 50, 95, 2, 8, 0, 160, 99, 68, 5, 174, 1, 93, 2, 105, 0, 1, 3, 5, 8, 0, 160, 99, 68, 5, 174, 1, 88, 3, 1, 3, 6, 8, 0, 160, 99, 68, 3, 50, 88, 3, 74, 0, 8, 0, 0, 72, 66, 8, 0, 0, 215, 67, 95, 2, 8, 91, 191, 106, 66, 8, 103, 247, 212, 67, 93, 2, 8, 91, 191, 134, 66, 8, 113, 64, 212, 67, 93, 2, 8, 8, 31, 152, 66, 8, 3, 152, 211, 67, 93, 2, 8, 181, 126, 169, 66, 8, 190, 96, 212, 67, 93, 2, 8, 98, 222, 186, 66, 8, 171, 61, 207, 67, 93, 2, 8, 16, 62, 204, 66, 8, 172, 98, 204, 67, 93, 2, 8, 189, 157, 221, 66, 8, 228, 160, 203, 67, 93, 2, 8, 106, 253, 238, 66, 8, 96, 118, 213, 67, 93, 2, 8, 140, 46, 0, 67, 8, 174, 185, 195, 67, 93, 2, 8, 98, 222, 8, 67, 8, 171, 218, 212, 67, 93, 2, 8, 57, 142, 17, 67, 8, 225, 222, 207, 67, 93, 2, 8, 16, 62, 26, 67, 8, 154, 53, 211, 67, 93, 2, 8, 230, 237, 34, 67, 8, 194, 185, 192, 67, 93, 2, 8, 189, 157, 43, 67, 8, 205, 200, 198, 67, 93, 2, 8, 147, 77, 52, 67, 8, 158, 253, 191, 67, 93, 2, 8, 106, 253, 60, 67, 8, 14, 223, 192, 67, 93, 2, 8, 65, 173, 69, 67, 8, 136, 15, 193, 67, 93, 2, 8, 23, 93, 78, 67, 8, 56, 83, 175, 67, 93, 2, 8, 238, 12, 87, 67, 8, 111, 18, 181, 67, 93, 2, 8, 197, 188, 95, 67, 8, 143, 218, 200, 67, 93, 2, 8, 155, 108, 104, 67, 8, 92, 34, 210, 67, 93, 2, 8, 114, 28, 113, 67, 8, 60, 243, 214, 67, 93, 2, 8, 72, 204, 121, 67, 8, 192, 128, 194, 67, 93, 2, 8, 16, 62, 129, 67, 8, 164, 30, 209, 67, 93, 2, 8, 251, 149, 133, 67, 8, 255, 237, 183, 67, 93, 2, 8, 230, 237, 137, 67, 8, 5, 206, 170, 67, 93, 2, 8, 209, 69, 142, 67, 8, 194, 254, 168, 67, 93, 2, 8, 189, 157, 146, 67, 8, 239, 49, 155, 67, 93, 2, 8, 168, 245, 150, 67, 8, 160, 45, 181, 67, 93, 2, 8, 147, 77, 155, 67, 8, 227, 184, 176, 67, 93, 2, 8, 127, 165, 159, 67, 8, 103, 6, 187, 67, 93, 2, 8, 106, 253, 163, 67, 8, 76, 83, 145, 67, 93, 2, 8, 85, 85, 168, 67, 8, 193, 32, 212, 67, 93, 2, 8, 65, 173, 172, 67, 8, 74, 254, 201, 67, 93, 2, 8, 44, 5, 177, 67, 8, 159, 227, 183, 67, 93, 2, 8, 23, 93, 181, 67, 8, 47, 143, 185, 67, 93, 2, 8, 3, 181, 185, 67, 8, 146, 164, 201, 67, 93, 2, 8, 238, 12, 190, 67, 8, 66, 81, 143, 67, 93, 2, 8, 217, 100, 194, 67, 8, 13, 182, 214, 67, 93, 2, 8, 197, 188, 198, 67, 8, 112, 35, 157, 67, 93, 2, 8, 176, 20, 203, 67, 8, 32, 212, 182, 67, 93, 2, 8, 155, 108, 207, 67, 8, 220, 68, 126, 67, 93, 2, 8, 134, 196, 211, 67, 8, 191, 210, 157, 67, 93, 2, 8, 114, 28, 216, 67, 8, 250, 32, 150, 67, 93, 2, 8, 93, 116, 220, 67, 8, 182, 222, 133, 67, 93, 2, 8, 72, 204, 224, 67, 8, 50, 54, 166, 67, 93, 2, 8, 52, 36, 229, 67, 8, 75, 186, 158, 67, 93, 2, 8, 31, 124, 233, 67, 8, 112, 189, 118, 67, 93, 2, 8, 10, 212, 237, 67, 8, 29, 215, 115, 67, 93, 2, 8, 246, 43, 242, 67, 8, 198, 142, 141, 67, 93, 2, 8, 225, 131, 246, 67, 8, 246, 39, 93, 67, 93, 2, 8, 204, 219, 250, 67, 8, 102, 221, 121, 67, 93, 2, 8, 184, 51, 255, 67, 8, 90, 237, 93, 67, 93, 2, 8, 209, 197, 1, 68, 8, 147, 29, 69, 67, 93, 2, 8, 199, 241, 3, 68, 8, 93, 119, 75, 67, 93, 2, 8, 189, 29, 6, 68, 8, 11, 190, 203, 67, 93, 2, 8, 178, 73, 8, 68, 8, 10, 241, 61, 67, 93, 2, 8, 168, 117, 10, 68, 8, 245, 63, 206, 67, 93, 2, 8, 158, 161, 12, 68, 8, 237, 186, 187, 67, 93, 2, 8, 147, 205, 14, 68, 8, 37, 177, 180, 67, 93, 2, 8, 137, 249, 16, 68, 8, 254, 159, 162, 67, 93, 2, 8, 127, 37, 19, 68, 8, 64, 121, 141, 67, 93, 2, 8, 116, 81, 21, 68, 8, 74, 135, 158, 67, 93, 2, 8, 106, 125, 23, 68, 8, 238, 13, 47, 67, 93, 2, 8, 96, 169, 25, 68, 8, 124, 34, 174, 67, 93, 2, 8, 85, 213, 27, 68, 8, 184, 48, 92, 67, 93, 2, 8, 75, 1, 30, 68, 8, 241, 42, 194, 67, 93, 2, 8, 65, 45, 32, 68, 8, 250, 71, 214, 67, 93, 2, 8, 54, 89, 34, 68, 8, 62, 186, 210, 67, 93, 2, 8, 44, 133, 36, 68, 8, 185, 243, 63, 67, 93, 2, 8, 34, 177, 38, 68, 8, 156, 24, 76, 67, 93, 2, 8, 23, 221, 40, 68, 8, 159, 126, 207, 67, 93, 2, 8, 13, 9, 43, 68, 8, 93, 47, 29, 67, 93, 2, 8, 3, 53, 45, 68, 8, 209, 100, 137, 67, 93, 2, 8, 248, 96, 47, 68, 8, 22, 73, 62, 67, 93, 2, 8, 238, 140, 49, 68, 8, 245, 10, 38, 67, 93, 2, 8, 228, 184, 51, 68, 8, 155, 142, 61, 67, 93, 2, 8, 217, 228, 53, 68, 8, 141, 36, 197, 67, 93, 2, 8, 207, 16, 56, 68, 8, 55, 187, 52, 67, 93, 2, 8, 197, 60, 58, 68, 8, 173, 225, 214, 66, 93, 2, 8, 186, 104, 60, 68, 8, 69, 64, 203, 67, 93, 2, 8, 176, 148, 62, 68, 8, 30, 20, 176, 67, 93, 2, 8, 165, 192, 64, 68, 8, 240, 72, 103, 67, 93, 2, 8, 155, 236, 66, 68, 8, 236, 201, 108, 66, 93, 2, 8, 145, 24, 69, 68, 8, 129, 113, 159, 66, 93, 2, 8, 134, 68, 71, 68, 8, 74, 97, 143, 67, 93, 2, 8, 124, 112, 73, 68, 8, 233, 253, 127, 67, 93, 2, 8, 114, 156, 75, 68, 8, 165, 88, 219, 66, 93, 2, 8, 103, 200, 77, 68, 8, 232, 51, 132, 66, 93, 2, 8, 93, 244, 79, 68, 8, 141, 162, 57, 67, 93, 2, 8, 83, 32, 82, 68, 8, 128, 84, 55, 67, 93, 2, 8, 72, 76, 84, 68, 8, 252, 100, 153, 67, 93, 2, 8, 62, 120, 86, 68, 8, 28, 110, 208, 67, 93, 2, 8, 52, 164, 88, 68, 8, 11, 121, 73, 67, 93, 2, 8, 41, 208, 90, 68, 8, 78, 209, 195, 67, 93, 2, 8, 31, 252, 92, 68, 8, 0, 0, 72, 66, 93, 2, 8, 21, 40, 95, 68, 8, 69, 0, 200, 67, 93, 2, 8, 10, 84, 97, 68, 8, 91, 248, 214, 67, 93, 2, 8, 0, 128, 99, 68, 8, 117, 127, 201, 67, 93, 2, 105, 0, 78, 0]
)


main_runtime.interpret(bytecodes, {})

var interacitve_bytecodes = new Uint8Array(
[16, 132, 0, 0, 0, 114, 0, 103, 0, 98, 0, 97, 0, 40, 0, 49, 0, 50, 0, 56, 0, 44, 0, 50, 0, 48, 0, 48, 0, 44, 0, 49, 0, 50, 0, 56, 0, 44, 0, 48, 0, 46, 0, 56, 0, 41, 0, 3, 0, 109, 0, 111, 0, 117, 0, 115, 0, 101, 0, 95, 0, 112, 0, 111, 0, 115, 0, 95, 0, 121, 0, 3, 0, 109, 0, 111, 0, 117, 0, 115, 0, 101, 0, 95, 0, 112, 0, 111, 0, 115, 0, 95, 0, 120, 0, 3, 0, 99, 0, 117, 0, 114, 0, 115, 0, 111, 0, 114, 0, 95, 0, 120, 0, 3, 0, 99, 0, 117, 0, 114, 0, 115, 0, 111, 0, 114, 0, 95, 0, 121, 0, 3, 0, 3, 0, 3, 0, 5, 192, 3, 5, 224, 1, 76, 4, 1, 3, 0, 69, 1, 74, 0, 8, 0, 0, 0, 63, 1, 3, 1, 41, 1, 36, 31, 8, 0, 0, 0, 63, 1, 3, 2, 41, 1, 36, 31, 33, 23, 0, 0, 0, 5, 21, 3, 21, 0, 21, 1, 37, 21, 4, 21, 3, 37, 39, 21, 2, 21, 1, 37, 38, 36, 18, 19, 31, 32, 1, 3, 50, 45, 32, 1, 5, 142, 3, 47, 39, 32, 0, 3, 50, 45, 32, 0, 5, 174, 1, 47, 39, 39, 43, 104, 0, 0, 0, 3, 50, 32, 0, 95, 2, 5, 142, 3, 32, 0, 93, 2, 32, 1, 3, 50, 95, 2, 32, 1, 5, 174, 1, 93, 2, 78, 0, 105, 0, 1, 3, 3, 32, 2, 32, 1, 3, 50, 5, 142, 3, 7, 44, 65, 244, 88, 7, 96, 88, 244, 88, 34, 6, 32, 1, 3, 50, 49, 3, 42, 2, 1, 3, 4, 32, 2, 32, 0, 5, 174, 1, 3, 50, 8, 0, 0, 0, 0, 8, 210, 9, 172, 66, 34, 6, 3, 50, 32, 0, 49, 3, 42, 2, 7, 2, 0, 0, 0, 20, 3, 0, 17, 17, 17]
)

interactive_canvas.addEventListener('mousemove', function(e){
  var env = {
    mouse_pos_x: e.pageX - interactive_canvas.parentNode.offsetLeft,
    mouse_pos_y: e.pageY - interactive_canvas.parentNode.offsetTop
  }

  interactive_runtime.interpret(interacitve_bytecodes, env)

  if (env.cursor_x)
    interactive_ctx.fillText(new Date(env.cursor_x[0] * 1000), env.cursor_x[1], env.cursor_x[2])

  if (env.cursor_y)
    interactive_ctx.fillText(env.cursor_y[0].toFixed(2), env.cursor_y[1], env.cursor_y[2])
})