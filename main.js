function addTaskListener() {
    var target = $('#btn');
    target.click(insertTask);
};

function insertTask(){
    var target = $('#task_value');
    var text = target.val();
    
    $.ajax({
        url: 'http://157.230.17.132:3029/todos',
        method: 'POST',
        data: {
            text: text
        },
        success: function(data) {
            console.log('data', data);
            getList();
        },
        error: function(err) {
            console.log('err', err)
        }
    });
};

function deleteListListener() {
    $(document).on('click', '.delete', deleteTask)
}

function deleteTask() {
    var button = $(this);
    var id = button.data('id');

    $.ajax({

        url: `http://157.230.17.132:3029/todos/${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log('data', data);
            getList();
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function getList() {
    $.ajax({
        url:  'http://157.230.17.132:3029/todos',
        method: 'GET',
        success: function(data) {
            printList(data);
        },
        error: function(err) {
            console.log('err', err);
        }
    })
};

function printList(tasks) {
 var target = $('#tasks');
 target.text('');
 for (var i = 0; i < tasks.length; i++) {
     var task = tasks[i];
     target.append(`<li>${task.text}<span data-id="${task.id}" class="delete"><b> x </b></span></li>`)
     
 }
}



function init() {
// alert('hello world');
getList();
addTaskListener();
deleteListListener()
}

$(document).ready(init);