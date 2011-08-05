jQuery ->
  ($ "article.lesson:gt(0)").hide()

  ($ "#next-lesson").click ->
    $current = ($ "article.lesson:visible")
    if $current.next("article.lesson").length is 0 then return false
    $current.slideUp 500, -> ($ this).next().slideDown 500
    false

  ($ "#prev-lesson").click ->
    $current = ($ "article.lesson:visible")
    if $current.prev("article.lesson").length is 0 then return false
    $current.slideUp 500, -> ($ this).prev().slideDown 500
    false
