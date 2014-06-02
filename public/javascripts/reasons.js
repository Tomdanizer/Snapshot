var reasons = (function(){
    var init = function(){
         $("#add_reason_button").popover({
            html : true, 
            content: function() {
              return $('#add_reason_popover').html();
            }
        }); 
        $("#add_snap_button").popover({
            html : true, 
            content: function() {
              return $('#add_snap_popover').html();
            }
        }); 
        $('#add_reason_button').on('shown.bs.popover', function () {
          addReason();
        })
        $('#modal-confirm-delete-reason').on('shown.bs.modal', function (e) {
                $(".confirm-delete-selected-reason").on("click", function(){
                    layout.deleteSelectedRow($("#reason_list")[0]);
                });
        })
    };

    

    addReason = function(){
        $('.add-reason').on('click', function(event) {
            event.preventDefault();
               var reasonName = $(this).parents("form").find("#reasonName").val();

               
               $.ajax({
                    url: "/reasons/addreason",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        name: reasonName,
                    }),
                    complete: function (data) {
                        $('#reason_table').html(data.responseText);
                        $('#add_reason_button').popover('hide')
                        //document.location.reload(true);
                    }
                });

        });
    };


    return{
        init: init
    }
})();
$( document ).ready(function() {
    reasons.init();
});