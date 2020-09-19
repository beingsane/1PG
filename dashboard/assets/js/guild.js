$('.tabs a, #sidebarExtension h4').on('click', function() {
  $('.tabs a').removeClass('active');

  const selected = $(this);
  selected.addClass('active');

  const id = $(selected).attr('id');
  setModule(id);
});

function setModule(moduleId) {
  $('.module').hide();
  $(`#${moduleId}Module`).show();
}

setModule('overview');