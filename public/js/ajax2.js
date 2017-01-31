$(document).ready(function() {


  $(".profile-submit").click(function(){
    console.log('test');
    var profile_pic = document.getElementById("profile_pic_upload").files[0];
    var username = $(".username-add").val();
    var multidata = new FormData();
    multidata.append("username", username);
    multidata.append("profile_pic", profile_pic);
    
    $.ajax({
      url: '/login/editProfile',
      type: 'POST',
      data: multidata,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        // add a new list element containing the returned data
        $(".user-add").append("<li>" + data + "</li>");
        window.location.href = data;
      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    })
  });  

});