#coding=utf-8

from dsl import op
from compiler import Compiler

import datetime, random

width = 960
height = 480

now = int(datetime.datetime.now().timestamp() * 1000)

points = [[now + i * 60 * 1000, random.random() * i] for i in range(100)]

min_date = points[0][0]
max_date = points[len(points) - 1][0]

min_val = min(points, key=lambda x: x[1])[1]
max_val = max(points, key=lambda x: x[1])[1]

padding = 50

chart_compiler = Compiler()

# config canvas context
chart_compiler.compile(
  op.font('14px Helvatica, Arial'),
  op.strokeStyle('rgba(0, 0, 255, 0.8)'),
  op.fillStyle('rgba(0, 128, 128, 0.8)')
)

# plot x axis
max_str = str(datetime.datetime.fromtimestamp(max_date / 1000))
chart_compiler.compile(
  op.moveTo(padding, height - padding + 0.5),
  op.lineTo(width - padding, height - padding + 0.5),
  op.stroke(),
  op.fillText(str(datetime.datetime.fromtimestamp(min_date / 1000)), padding, height - padding + 14),
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
def linearConvert(x, display_range, actual_range):
  return (x - actual_range[0]) * (display_range[1] - display_range[0]) / (actual_range[1] - actual_range[0]) + display_range[0]

codes = []
codes.append(op.beginPath())
for (index, point) in enumerate(points):
  x = linearConvert(point[0], [padding, width - padding], [min_date, max_date])
  y = linearConvert(point[1], [height - padding, padding], [min_val, max_val])
  if not index:
    codes.append(op.moveTo(x, y))
  else:
    codes.append(op.lineTo(x, y))

codes.append(op.stroke())
codes.append(op.closePath())
chart_compiler.compile(*codes)

print(chart_compiler.output())