$(function(){
  commantHandler();
  selecetNotes();
  dropDownBtn();
});

function commantHandler(){
  function closeNewCommentWindow(){
    $("#new-comment-text").text("");
    $("#add-comment-active").attr("id","add-comment-not-active");
  }

  $(document).on("mouseup",function(){
    if($("#new-comment-text").is(":focus")){
      if($("#add-comment-not-active").length != 0){
        $("#add-comment-not-active").attr("id","add-comment-active");
      }
    }
    else{
      if($("#new-comment-text").text() == ""){
        if($("#add-comment-active").lenght != 0){
          closeNewCommentWindow();
        }
      }
    }
  });

  $("#save-comment").click(function(){
    let textVal = $("#new-comment-text").text();
    textVal.replaceAll("/t","")

    if(textVal != ""){
      let d = new Date();

      let tag =
      `<div class="comment-data">
        <div class="comment-date-info">
        <p class="comment-date">${getFullYear(d)}</p>
        <p class="comment-time">${getFullTime(d)}</p>
        </div>
        <p class="comment-text">${textVal}<p>
        </div>`;
      $("#comment-container").prepend(tag);
      closeNewCommentWindow();
    }
  });

}
function selecetNotes(){
   $(document).mousedown(function(){
     if(!$(".note:hover").length != 0 && !$("#note-option-menu:hover").length != 0 && !$("#save-edit-title:hover").length != 0){

       unSelecte();
     }
    });
    $(".note").mousedown(function(event){
      if(event.which == 3){
        unSelecte();

        $("#note-option-menu").css("display","block");
        $("#note-option-menu").css("top",`${event.pageY}px`);
        $("#note-option-menu").css("left",`${event.pageX}px`);

        let id = $($(this).find(".id")).text();
        $($("#note-option-menu").find("#option-note-id")).text(id);
        $(this).attr("id","optimize-note");
      }

    });
}


function unSelecte(){
  $("#optimize-note .title").show();
  $("#optimize-note .date-info").show();
  $("#optimize-note .icons").show();
  $("#optimize-note input").remove();
  $("#optimize-note button").remove();
  $("#optimize-note").removeAttr("id");
  $("#note-option-menu").css("display","none");
}
function renderAllNotes(notes){
  for(let i = 0; i < notes.length; i++){
    let descOpacity = 1;
    if(notes[i].desc == ""){descOpacity = 0.5;}

    let title = notes[i].title;
    let maxChar = 14;
    if(title.length > maxChar){
      title = title.slice(0,maxChar)+"...";
    }

    let tag =
    `
    <div class="note"  oncontextmenu="return false;">
    <p class="title">${title}</p>

    <div class="date-info">
    <p class="date">${notes[i].date.year}</p>
    <p class="time">${notes[i].date.time}</p>
    </div>

    <div class="icons">

    <img class="description-icon" src="icons/description.svg" style="opacity:${descOpacity}">
    <div class="comment">
     <img class="comment-icon"  src="icons/comment.svg">
    <p style="margin-left:-${String(notes[i].comments.length).length*10}px;">${notes[i].comments.length}</p>
    </div>

    </div>
    <div class="id" style="display:none">${notes[i].id}</div>
    </div>
    `
    $("#first-page").prepend(tag);
  }

}
function renderSecendPage(){
  unSelecte();
  $("html").css("width",`741px`);
  $("#first-page").css("margin-left","400px");
  $("#create-note-btn").css("left",`526px`);

  $("#second-page").css("display","block");
  $("#add-url").show();
  $("#cancel-btn").show();
  $("#save-btn").show();
}
function hideSecondPage(){
  $("#add-url").hide();
  $("#cancel-btn").hide();
  $("#save-btn").hide();
  $("#second-page").css("display","none");

  $("html").css("width",`352px`);
  $("#first-page").css("margin-left","459px");

  $("#first-page").css("margin-left","11px");
  $("#create-note-btn").css("left","133px");
  $("#second-page").css("display","none");


}


function dropDownBtn(){
  function selectDisplay(attr,rotate){
    let currDisplay = $(`${attr}`).css("display");

    let rotation = currDisplay == "none" ? "180":"0";
    $(`${rotate}`).css("transform",`rotate(${rotation}deg)`);

    return currDisplay == "none" ? "block" : "none";
  }

  $("#desc-dropdown").click(function(){
    $("#desc-text").css("display",selectDisplay("#desc-text","#desc-dropdown"));
  });
  $("#comment-dropdown").click(function(){
    $("#new-comment-text").css("display",selectDisplay("#new-comment-text","#comment-dropdown"));
  });
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
