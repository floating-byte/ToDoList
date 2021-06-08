var open = false;

$(function(){
  reLoad();
  expandWindow();

  editTitle();

  toDo();
}());
function toDo(){
  $("#clear-btn").click(function(){  clearData();  });
  $("#edit-btn").click(function(){  editPage();  });
  $("#save-btn").click(function(){
    if(saveNewNote()){
      open = false;
    }
  });
  $("#saveAs-btn").click(function(){
      saveAsNew();
      open = false;
  });
  $("#delete-note").click(function(){
    $("#note-option-menu").hide();
    function msgState(state){
      if(state == "hide"){
        $("#cover-layer").hide();
        $("#are-u-sure").hide();
      }
      else if(state == "show"){
        $("#cover-layer").show();
        $("#are-u-sure").show();
      }

    }


    msgState("show");

    let id = parseInt($("#option-note-id").text());
    $("#yes").click(function(){
      remove(id);
      msgState("hide");
    });
    $("#no").click(function(){
      msgState("hide");
    });
  });
}

function editPage(){
  $("#second-page").removeClass("page-read-mode");
  $("#second-page").addClass("page-edit-mode");
  disbleInputText(false);

  $(".read-page").addClass("edit-page");
  $(".read-page").removeClass("read-page");

}
function removeComment(thisComment){
    let noteId = $("#note-id").text();
    let commentIndex = $(thisComment).parent().find(".comment-index").text();

    if(noteId == ""){
        $(thisComment).parent().remove();
        return ;
    }
    noteId = parseInt(noteId);
    note = getNote(noteId);
    note.comments.splice(commentIndex,1);
    saveNote(note,noteId);
    $(thisComment).parent().remove();
}

function expandWindow(){
  $("#create-note-btn").click(function(){
    if(!open){
      $("#create-note-btn").text("Cancle");

      $("#second-page").addClass("page-on");

      $("#second-page").addClass("page-write-mode");
      $("#second-page").removeClass("page-read-mode");

      $(".read-page").addClass("write-page");
      $(".read-page").removeClass("read-page");

      $(".no-page").addClass("write-page");
      $(".no-page").removeClass("no-page");


      $(".edit-page").addClass("write-page");
      $(".edit-page").removeClass("edit-page");

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
  $("#rename-note").click(function(){

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
    let id = $(this).find(".id").text();
    note = getNote(id);
    if(exsit(".page-read-mode") || exsit(".page-edit-mode") ){
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
    $("#second-page").removeClass("page-edit-mode");
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
        <p class="comment-text">${note.comments[i].text}</p>
        <img src = "icons/cancle.svg">
        <p class="comment-index" style="display:none">${i}</p>
        </div>`;

      $("#comment-container").append(tag);
    }

    $(".edit-page").addClass("read-page");
    $(".edit-page").removeClass("edit-page");

    $(".write-page").addClass("read-page");
    $(".write-page").removeClass("write-page");

    $(".no-page").addClass("read-page");
    $(".no-page").removeClass("no-page");

    $(".comment-data img").click(function(){ removeComment(this); });


  });

}
