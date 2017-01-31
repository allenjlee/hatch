
$(document).ready(function() {


  $(".add-submit").click(function() {
    // get the mealName, mealDay, mealType, and mealStyle
    var name = $(".mealName-add").val();
    var day = $(".mealDay-add").val();
    var time = $(".mealTime-add").val();
    var place = $(".location-add").val();
    var descript = $(".description-add").val();
    var cost = $(".price-add").val();
    var meal_pic = document.getElementById("img_meal_upload").files[0];
    var user=$(".user-add").val();
    var capacity= $(".capacity-add").val();
    
    var multidata = new FormData();
    multidata.append("mealName", name);
    multidata.append("mealDay", day);
    multidata.append("mealTime", time);
    multidata.append("location", place);
    multidata.append("description", descript);
    multidata.append("meal_pic", meal_pic);
    multidata.append("username",user);
    multidata.append("price", cost);
    multidata.append("capacity", capacity);

    // send the AJAX request
    $.ajax({
      url: '/createMeal/addMeal',
      type: 'POST',
      data: multidata,
      cache: false,
      contentType: false,
      processData: false,

      success: function(data) {
        // add a new list element containing the returned data
        $(".mealinfo-add").append("<li>" + data + "</li>");
        window.location.href = data;
      },
      error: function(xhr, status, error) {
        console.log("Uh oh there was an error: " + error);
      }
    });
  });

});