$(document).ready(function () {
  var $form_modal = $(".cd-user-modal"),
    $form_login = $form_modal.find("#cd-login"),
    $main_nav = $(".main-nav");
  $main_nav.on("click", function (event) {
    if ($(event.target).is($main_nav)) {
      console.log($(this).children("ul"));
      $(this).children("ul").toggleClass("is-visible");
    } else {
      $main_nav.children("ul").removeClass("is-visible");
      $form_modal.addClass("is-visible");
      //   $(event.target).is(".cd-signup") ? signup_selected() : login_selected();
    }
  });
});
