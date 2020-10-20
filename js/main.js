
$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  $('[data-toggle="popover"]').popover()

  $('.carousel').carousel({
  interval: 5000
  });

  
  $('#exampleModal').on('show.bs.modal', function(e){
          
    $('#contactoBtn').removeClass('btn-outline-success');
    $('#contactoBtn').addClass('btn-primary');
    $('#contactoBtn').prop('disabled', true);

  });
  
  
  
  
  $('#exampleModal').on('show.bs.modal', function(e){
      console.log('El modal se esta mostrando');
  });

  $('#exampleModal').on('shown.bs.modal', function(e){
      console.log('El modal se esta mostró');
  });

  $('#exampleModal').on('hide.bs.modal', function(e){
      console.log('El modal se esta ocultando');
  });

  $('#exampleModal').on('hidden.bs.modal', function(e){
      console.log('El modal se esta ocultó');
      $('#contactoBtn').prop('disabled', false);
  });




});
