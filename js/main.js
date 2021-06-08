var open = false;

$(function(){
  reLoad();
  expandWindow();

  editTitle();

  toDo();
}());
function toDo(){
  $("#cancel-btn").click(function(){  clearData();  });
  $("#save-btn").click(function(){
    if(saveNewNote()){
      open = false;
    }
  });
  $("#delete-note").click(function(){
    $("#note-option-menu").hide();
    let id = parseInt($("#option-note-id").text());
    remove(id);
  });
}



function expandWindow(){
  $("#create-note-btn").click(function(){
    if(!open){
      $("#create-note-btn").text("Cancle");

      $("#second-page").addClass("page-on");

      $("#second-page").addClass("page-write-mode");
      $("#second-page").removeClass("page-read-mode");

      disbleInputText(false);

      clearData();
      renderSecendPage();
    }
    else{
      $("#create-note-btn").text("New Note");

      $("#second-page").addClass("page-off");


      hideSecondPage();
    }
    open = !open;
  });

}


function editTitle(){
  $("#edit-note").click(function(){

    if($(".edit-box").length != 0){
      $("#note-option-menu").css("display","none");
      return ;
    }
    let tag;
    tag = "<button type='button' id='save-edit-title'><img src='icons/save.svg'></button>"
    $("#optimize-note").prepend(tag);
    tag = '<input class="edit-box" spellcheck="false">';
    $("#optimize-note").prepend(tag);

    $("#optimize-note .date-info").hide();
    $("#optimize-note .icons").hide();


    let id = $("#option-note-id").text();
    $(".edit-box").val(getNote(id).title);

    $("#optimize-note .title").hide();
    $("#note-option-menu").css("display","none");

    saveEditedTitle();

  });

}
function saveEditedTitle(){
  $("#save-edit-title").click(function(){
    let newTitle = $(".edit-box").val();
    let parent = $($("#save-edit-title").parent());

    if(newTitle == ""){return ;}
    if(newTitle == parent.find(".title").text()){return;}

    let id = parent.find(".id").text();
    let notes = store.get("notes");
    notes[parseInt(id)].title = newTitle;

    save(notes);
  });
}


function showNoteInfo(){
  $(".note").click(function(){
    if($(".edit-box").length != 0){
      //prevent opening a windon when i am in edit mode
      return;
    }
    // NOTE: close window whene double click
    let id = $(this).find(".id").text();
    note = getNote(id);
    if(exsit(".page-read-mode")){
      let pageId = $("#note-id").text();
      if(pageId == id){
        hideSecondPage();
        return;
      }
    }


    open = false;
    clearData();
    renderSecendPage();


    $("#second-page").addClass("page-read-mode");
    $("#second-page").addClass("page-on");

    $("#second-page").removeClass("page-write-mode");
    $("#create-note-btn").text("New Note");

    disbleInputText(true);


    $("#note-id").text(id);

    $("#title-text").val(note.title);
    $("#desc-text").text(note.desc);

    $("#comment-container").empty();
    for(let i = 0; i < note.comments.length;i++){
      let tag =
      `<div class="comment-data">
        <div class="comment-date-info">
        <p class="comment-date">${note.comments[i].date.year}</p>
        <p class="comment-time">${note.comments[i].date.time}</p>
        </div>
        <p class="comment-text">${note.comments[i].text}<p>
        </div>`;

      $("#comment-container").append(tag);
    }
  });

}
