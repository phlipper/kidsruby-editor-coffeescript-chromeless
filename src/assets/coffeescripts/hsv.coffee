hsvToRgb = (h, s, v) ->
  if s is 0 then return format v, v, v

  h = ((h + 360) % 360) / 60

  i = Math.floor h
  f = h - i
  p = v * (1 - s)
  q = v * (1 - s * f)
  t = v * (1 - s * (1 - f))

  format = (r, g, b) ->
    "rgb(#{Math.round(r * 255)}, #{Math.round(g * 255)}, #{Math.round(b * 255)})"

  switch i
    when 0
      r = v; g = t; b = p;
    when 1
      r = q; g = v; b = p;
    when 2
      r = p; g = v; b = t;
    when 3
      r = p; g = q; b = v;
    when 4
      r = t; g = p; b = v;
    else r = v; g = p; b = q;

  format r, g, b
