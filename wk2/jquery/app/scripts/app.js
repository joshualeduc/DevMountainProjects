$(document).ready(function(){
  $('#newTaskForm').hide();
  
  if(localStorage['listo']){
    var listo = JSON.parse(localStorage['listo']);
    for(var i = 0; i < listo.length; i++){
      if(listo[i].id === 'new'){
          $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }else if(listo[i].id === 'inProgress'){
          $('#currentList').append('<a href="#" class="" id="inProgress"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }else if(listo[i].id === 'archived'){
          $('#archivedList').append('<a href="#" class="" id="archived"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
        }
    }
  }else{
    var listo = [];
  }
  
  var advanceTask = function(task){
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++){
      if(listo[i].task === modified){
        if(listo[i].id === 'new'){
          listo[i].id = 'inProgress';
          localStorage['listo'] = JSON.stringify(listo);
        }else if(listo[i].id === 'inProgress'){
          listo[i].id = 'archived';
          localStorage['listo'] = JSON.stringify(listo);
        }else{
          listo.splice(i, 1);
          localStorage['listo'] = JSON.stringify(listo);
        }
        break;
      }
    }
  task.remove();
  };
  
  
  var Task = function(task){
    this.task = task;
    this.id = 'new';
  };
  
  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);
      localStorage['listo'] = JSON.stringify(listo);
      $('#newItemInput').val('');
      $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
    }
    $('#newTaskForm', '#newListItem').fadeToggle('fast', 'linear');
  };
  
  $('#saveNewItem').on('click', function (e){
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });
  
  $('#newListItem').on('click', function(){
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });
  
  $('#cancel').on('click', function(e){
    e.preventDefault();
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });
  
  $(document).on('click', '#item', function(e){
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });
  
  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
  
  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  
});