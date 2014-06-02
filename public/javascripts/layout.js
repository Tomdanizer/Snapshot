var layout = (function(){
    var init = function(){
        $('body').on('click', function (e) {
            $('[data-toggle="popover"]').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });

        $('.nav li').on('click', function(e){
            $('.nav li').removeClass('active');
            var $this = $(this);
            if (!$this.hasClass('active')) {
                $this.addClass('active');
            }
        });
    },
    deleteSelectedRow = function(table){
            var obj = []
            $.each($(table).serializeArray(), function() {
                obj.push(this.name);
            });
            //console.log(obj);
            
            var url = "";
            var id = table.id;
            if(id === 'snap_list'){
                url="/deletesnap";
            }else if(id === 'project_list'){
                url="/deleteproject";
            }else if(id === 'reason_list'){
                url="/deletereason";
            }else{
                console.log("Invalid form id");
            }
            
            if(url !== ""){
               $.ajax({
                    url: url,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    complete: function (data) {
                        if(id === 'snap_list'){
                            $('#snaps_table').html(data.responseText);
                            $('#modal-confirm-delete-snap').modal('hide')
                        }else if(id === 'project_list'){
                            $('#project_table').html(data.responseText);
                            $('#modal-confirm-delete-project').modal('hide')
                        }else if(id === 'reason_list'){
                            $('#reason_table').html(data.responseText);
                            $('#modal-confirm-delete-reason').modal('hide')
                        }else{
                            //console.log("Invalid form id");
                        }
                        
                        //document.location.reload(true);
                    }
                });
           }
    };
    activateSelectedRow = function(table){
                var obj = []
                $.each($(table).serializeArray(), function() {
                    obj.push(this.name);
                });
                //console.log(obj);
                
                var url="/activateproject";
                
                if(url !== ""){
                   $.ajax({
                        url: url,
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(obj),
                        complete: function (data) {
                                $('#project_table').html(data.responseText);
                                $('#modal-confirm-activate-project').modal('hide')
                            
                            //document.location.reload(true);
                        }
                    });
               }
        };
    return{
        init: init,
        deleteSelectedRow: deleteSelectedRow,
        activateSelectedRow: activateSelectedRow
    }
})();
$( document ).ready(function() {
    layout.init();
});