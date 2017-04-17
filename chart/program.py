#coding=utf-8

from dsl import op
from compiler import Compiler

import datetime, random

width = 960
height = 480

now = int(datetime.datetime.now().timestamp())

points = [[now + i * 60, random.random() * i] for i in range(100)]

min_date = points[0][0]
max_date = points[len(points) - 1][0]

min_val = min(points, key=lambda x: x[1])[1]
max_val = max(points, key=lambda x: x[1])[1]

padding = 50

chart_compiler = Compiler()
interactive_compiler = Compiler()

# config canvas context
chart_compiler.compile(
  op.font('14px Helvatica, Arial'),
  op.strokeStyle('rgba(0, 0, 255, 0.8)'),
  op.fillStyle('rgba(0, 128, 128, 0.8)')
)

# plot x axis
max_str = str(datetime.datetime.fromtimestamp(max_date))
chart_compiler.compile(
  op.moveTo(padding, height - padding + 0.5),
  op.lineTo(width - padding, height - padding + 0.5),
  op.stroke(),
  op.fillText(str(datetime.datetime.fromtimestamp(min_date)), padding, height - padding + 14),
  op.fillText(max_str, op.sub(width - padding, op.measureText(max_str)) , height - padding + 14)
)

# plot y axis
chart_compiler.compile(
  op.moveTo(width - padding + 0.5, padding),
  op.lineTo(width - padding + 0.5, height - padding),
  op.stroke(),
  op.fillText(str(min_val), width - padding + 0.5, height - padding),
  op.fillText(str(max_val), width - padding + 0.5, padding)
)

# plot points
def actualToDisplay(x, display_range, actual_range):
  return (x - actual_range[0]) * (display_range[1] - display_range[0]) / (actual_range[1] - actual_range[0]) + display_range[0]

codes = []
codes.append(op.beginPath())
for (index, point) in enumerate(points):
  x = actualToDisplay(point[0], [padding, width - padding], [min_date, max_date])
  y = actualToDisplay(point[1], [height - padding, padding], [min_val, max_val])
  if not index:
    codes.append(op.moveTo(x, y))
  else:
    codes.append(op.lineTo(x, y))

codes.append(op.stroke())
codes.append(op.closePath())
chart_compiler.compile(*codes)

# handle mouse event
interactive_compiler.compile(
  op.clearRect(0, 0, width, height),
  op.strokeStyle('rgba(128,200,128,0.8)'),
  op.beginPath(),
  op.scope('y', op.add(0.5, op.envGet('mouse_pos_y')))(
  op.scope('x', op.add(0.5, op.envGet('mouse_pos_x')))(
  op.scope('displayToActual', op.func('x', 'display_left', 'display_right', 'actual_left', 'actual_right')(
    op.add(op.get('actual_left'),
           op.div(op.mul(op.sub(op.get('x'), op.get('display_left')),
                         op.sub(op.get('actual_right'), op.get('actual_left'))),
                  op.sub(op.get('display_right'),
                         op.get('display_left'))))
  ))(
    op.ifElse(op.mul(op.mul(op.gt(op.get('x'), padding),
                            op.lt(op.get('x'), width - padding)),
                     op.mul(op.gt(op.get('y'), padding),
                            op.lt(op.get('y'), height - padding))
              ),
              op.scope()(
                op.moveTo(padding, op.get('y')),
                op.lineTo(width - padding, op.get('y')),
                op.moveTo(op.get('x'), padding),
                op.lineTo(op.get('x'), height - padding),
                op.closePath(),
                op.stroke(),
                op.envSet('cursor_x', op.list(op.apply(op.get('displayToActual'), op.get('x'), padding, width - padding, min_date, max_date), op.get('x'), padding)),
                op.envSet('cursor_y', op.list(op.apply(op.get('displayToActual'), op.get('y'), height - padding, padding, min_val, max_val), padding, op.get('y')))
              ),
              0)

  )
  )
  )
)
print(chart_compiler.output())
print(interactive_compiler.output())
