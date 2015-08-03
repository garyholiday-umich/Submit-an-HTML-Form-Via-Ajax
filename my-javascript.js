$(document).ready(function() {
        
  function formValidation(formData) {
          
    var errorMessage = "";
          
    // check if name contains only letters and spaces
    if(!(/^[a-zA-Z ]+$/.test(formData.name))) {
      errorMessage = "<p>Name can only contain letters and spaces</p>";
    }
    // check if phone contains only numbers
    if(!(/^\d+$/.test($.trim(formData.phone)))) {
      errorMessage += "<p>Phone can only contain numbers</p>";
    }
    // check if subject is empty
    if($.trim(formData.subject) == "") {
      errorMessage += "<p>Subject is empty</p>";
    }
    // check if message is empty
    if($.trim(formData.message) == "") {
      errorMessage += "<p>Message is empty</p>";
    }
          
    // if there was an error than show the errors
    if(errorMessage != "") {
      $('#alert-box').html(errorMessage);
      $('#alert-box').show();
      return false;
    }
          
    // else hide error box and the form is validated!
    $('#alert-box').hide();
    return true;
          
  }

  // proccess the form
  $('form').submit(function(event) {
        
    // get the form information
    // this can be done in many ways but we are going to put the form
    // data into a data object
    var formData = {
      'name'     : $('input[name=name]').val(),
      'email'    : $('input[name=email]').val(),
      'mobile'   : $('input[name=mobile]').val(),
      'subject'  : $('input[name=subject]').val(),
      'message'  : $('textarea[name=message]').val()
    };
          
    // validate the form
    if(!formValidation(formData)) {
      return false; 
    }

    // process the form via Ajax
    $.ajax({
      type      : 'POST', // the method we want to use to send the data
      url       : 'process-form.php', // the url where we want to 
                                      // send the data
      data      : formData, // the data object we created
      dataType  : 'json', // what type of data we want to get back
      encode    : true
    })
      // execute function when data has been sent and server 
      // code is processed
      .done(function(data) {
              
        // if server returns false to success then show errors
        if (!(data.success)) {
          $('#alert-box').html(data.error);
          $('#alert-box').show();
        }
        // it was a success!
        else {
          $('form').hide();
          $('#form-area').append('<div class="alert alert-success"> 
                                    Form was submitted successfully!
                                  </div>'); 
        }
              
      });
            
    // stop the form from submitting the normal way and 
    // refreshing the page
    event.preventDefault();
          
  });

});