$(function(){
  loadNotes();
  expandWindow();

  save_A_Note();
  remove_A_Note();

  clearForm();
  editTitle();
}());
function noteAction(){
  showNoteInfo();
  selecetNotes();
}

function setNotes(notes){
  store.set("notes",notes);
  loadNotes();
}
function getNote(id){
  return store.get("notes")[parseInt(id)];
}





var open = false;
function expandWindow(){
  $("#create-note-btn").click(function(){
    if(!open){
      open = true;
      $("#create-note-btn").text("Cancle");
      $("#second-page").addClass("for-new-note");

      if($(".for-new-note").legth == 0){
        $("#second-page").addClass("for-new-note");
      }

      if($(".for-show-note").length != 0){
        $("#second-page").removeClass("for-show-note");
      }

      renderSecendPage();
      clearForm(true);
    }
    else{
      open = false;
      $("#create-note-btn").text("New Note");

      if($(".for-new-note").length != 0){
        $("#second-page").removeClass("for-new-note");
      }


      hideSecondPage();
    }
  });
}

function loadNotes(){
  $("#first-page").empty();

  let notes = store.get("notes");
  if(notes == undefined){
    return;
  }

  renderAllNotes(notes);
  noteAction();
}
function clearForm(shouldClear){
  function clear(){
    $("#title-text").val("");
    $("#desc-text").text("");
    $("#new-comment-text").text("");
    $("#comment-container").empty();
    $("#add-comment-active").attr("id","add-comment-not-active");
  }
  if(shouldClear){
    clear();
    return ;
  }
  $("#cancel-btn").click(function(){
    clearForm(true)
  });
}
function save_A_Note(){
  function getTheNote(){
    let note = {};
    note.title = $("#title-text").val();

    if(note.title == ""){
      $("#title-text").focus();
      return undefined;
    }
    console.log("emp")

    note.desc = $("#desc-text").text();
    note.date = {};

    let d = new Date();
    note.date.year = getFullYear(d);
    note.date.time = getFullTime(d);

    note.comments = [];

    let commTag = $(".comment-data");

    for(let i = 0; i < commTag.length; i++){
      let comment = {};
      comment.text = $($(commTag[i]).find(".comment-text")).text();
      if(comment.text != ""){
        comment.date = {};
        comment.date.year = $($(commTag[i]).find(".comment-date")).text();
        comment.date.time = $($(commTag[i]).find(".comment-time")).text();

        note.comments.push(comment);
      }
    }
    return note;
  }
  $("#save-btn").click(function(){

    let note = getTheNote();
    if(note == undefined){
      return;
    }

    let notes = [];
    if(store.get("notes") != undefined){
      notes = store.get("notes");
    }

    if($(".for-new-note").length != 0){
      note.id = notes.length;
      notes.push(note);
    }
    else{
      let id = $("#note-id").text();
      note.id = id;
      notes[parseInt(id)] =  note;
    }

    setNotes(notes);
    });
}
function remove_A_Note(id){
  function remove(id){
    let notes = store.get("notes");
    notes.splice(parseInt(id),1);
    for(let i = 0; i < notes.length;i++){
      notes[i].id = i;
    }

    if($(".for-show-note").length != 0){
      let shownNoteId = $(".for-show-note #note-id").text();
      if(parseInt(id) == parseInt(shownNoteId)){
        hideSecondPage();
      }
    }
    setNotes(notes);
  }

  if(id != undefined){
    remove(id);
    return;
  }
  $("#delete-note").click(function(){
      id = $("#option-note-id").text();
      $("#note-option-menu").css("display","none");
      remove_A_Note(id);
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

    setNotes(notes);
  });
}



function showNoteInfo(){
  $(".note").click(function(){
    if($(".edit-box").length != 0){
      return;
    }

    renderSecendPage();
    open = false;


    if($(".for-show-note").length == 0){
      $("#second-page").addClass("for-show-note");
    }

    if($(".for-new-note").length > 0){
      $("#second-page").removeClass("for-new-note");
      $("#create-note-btn").text("New Note");
    }

    let id = $(this).find(".id").text();
    note = getNote(id);

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
