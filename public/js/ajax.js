
$(document).ready(function() {

  
  $(".add-submit").click(function() {
    // get the mealName, mealDay, mealType, and mealStyle
    var name = $(".mealName-add").val();
    var day = $(".mealDay-add").val();
    var type = $(".mealType-add").val();
    var style = $(".mealStyle-add").val();
    var place = $(".location-add").val();
    var meal_pic = document.getElementById("img_meal_upload").files[0];
    console.log(meal_pic + "test");
    var multidata = new FormData();
    multidata.append("mealName", name);
    multidata.append("mealDay", day);
    multidata.append("mealType", type);
    multidata.append("mealStyle", style);
    multidata.append("location", place);
    multidata.append("meal_pic", meal_pic);

    console.log(meal_pic + "test");

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