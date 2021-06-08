function get(){
  let STORE_DATA = store.get("notes");
  return STORE_DATA == undefined ? [] : STORE_DATA;
}
function getNote(id){
  return get()[id];
}
function save(notes){
  store.set("notes",notes);
  reLoad();
}
function reLoad(){
  $("#first-page").empty();

  let notes = get();

  hideSecondPage();
  renderAllNotes(notes);
}



function saveNewNote(){
  let note = getNoteData();
  if(note == undefined){
    return undefined;
  }

  let notes = get();


  if(exsit(".page-write-mode")){
    note.id = notes.length;
    notes.push(note);
  }
  else if(exist(".page-read-mode")){
    let id = $("#note-id").text();
    note.id = id;
    notes[parseInt(id)] =  note;
  }
  save(notes);
  reLoad(notes);
  return true;
}
function getNoteData(){
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


/**/
function clearData(){
  $("#title-text").val("");
  $("#desc-text").text("");
  $("#new-comment-text").text("");
  $("#comment-container").empty();
  $("#add-comment-active").attr("id","add-comment-not-active");
}
function remove(id){
  function closeSecWindowIf(){
    //close the second window if the deleted note is the same
    // as the shown
    if(exsit(".page-on")){
      let shownNoteId = parseInt($("#note-id").text());
      if(id == shownNoteId){
        hideSecondPage();
      }
    }
  }
  if(id == undefined){
    return ;
  }

  let notes = get();
  notes.splice(id,1);
  for(let i = 0; i < notes.length;i++){
    notes[i].id = i;
  }

  closeSecWindowIf();
  save(notes);
}
/**/

/*helper*/
function exsit(attr){
  return $(attr).length == 0 ? false : true;
}
function getFullYear(date){
  let year = date.getFullYear();
  let day = date.getDate() ;
  let month = date.getMonth() +1;

  day = addZero(day);
  month = addZero(month);

  return `${year}/${month}/${day}`;
}
function getFullTime(date){
  let minute = date.getMinutes();
  let hour = date.getHours();
  minute = addZero(minute);
  hour = addZero(hour);

  return `${hour}:${minute}`;
}
function addZero(val){
  if(val <  10){
    return `0${val}`;
  }
  return `${val}`;
}
/*******/
