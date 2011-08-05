(function() {
  jQuery(function() {
    ($("article.lesson:gt(0)")).hide();
    ($("#next-lesson")).click(function() {
      var $current;
      $current = $("article.lesson:visible");
      if ($current.next("article.lesson").length === 0) {
        return false;
      }
      $current.slideUp(500, function() {
        return ($(this)).next().slideDown(500);
      });
      return false;
    });
    return ($("#prev-lesson")).click(function() {
      var $current;
      $current = $("article.lesson:visible");
      if ($current.prev("article.lesson").length === 0) {
        return false;
      }
      $current.slideUp(500, function() {
        return ($(this)).prev().slideDown(500);
      });
      return false;
    });
  });
}).call(this);
