$('.tabs a').on('click', function() {
  $('.tabs a').removeClass('active');
  $(this).addClass('active');
});

function setModule(name) {
  $('.module').hide();
  $(`#${name}Module`).show();
}

setModule('overview');