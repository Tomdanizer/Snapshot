var snapshot = (function(){
    var init = function(){
         $("#add_project_button").popover({
            html : true, 
            content: function() {
              return $('#add_project_popover').html();
            }
        }); 
        $("#add_snap_button").popover({
            html : true, 
            content: function() {
              return $('#add_snap_popover').html();
            }
        }); 
        $('#add_project_button').on('shown.bs.popover', function () {
          addProject();
        })
        $('#add_snap_button').on('shown.bs.popover', function () {
          addSnap();
        })
        $('#modal-confirm-delete-snap').on('shown.bs.modal', function (e) {
                $(".confirm-delete-selected-snap").on("click", function(){
                    layout.deleteSelectedRow($("#snap_list")[0]);
                });
        })
        $('#modal-confirm-delete-project').on('shown.bs.modal', function (e) {
                $(".confirm-delete-selected-project").on("click", function(){
                    layout.deleteSelectedRow($("#project_list")[0]);
                });
        })
        $('#modal-confirm-activate-project').on('shown.bs.modal', function (e) {
                $(".confirm-activate-selected-project").on("click", function(){
                    layout.activateSelectedRow($("#project_list")[0]);
                });
        })
        $(".project-filter").on("click", function(event) {
            event.preventDefault();
            $.ajax({
              url: this.pathname,
              dataType: "html",
              complete: function(data){
                $('#snaps_table').html(data.responseText);
              }
            });
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
            }else{
                //console.log("Invalid form id");
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
                        }else{
                            //console.log("Invalid form id");
                        }
                        
                        //document.location.reload(true);
                    }
                });
           }
    },

    addProject = function(){
        $('.add-project').on('click', function(event) {
            event.preventDefault();
               var projectName = $(this).parents("form").find("#projectName").val();
               var baseName = $(this).parents("form").find("#baseName").val();
               var groupName = $(this).parents("form").find("#groupName").val();

               
               $.ajax({
                    url: "/addproject",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        name: projectName,
                        group: groupName,
                        share: baseName
                    }),
                    complete: function (data) {
                        console.log(data);
                        $('#project_table').html(data.responseJSON.projectList);
                        $('#add_snap_popover').html(data.responseJSON.snapsProjectList);
                        $('#add_project_button').popover('hide')
                        //document.location.reload(true);
                    }
                });

        });
    },

    addSnap = function(){
        $('.add-snapshot').on('click', function(event) {
            event.preventDefault();
               var project = $(this).parents("form").find("#project_name_snap").val();
               var reason = $(this).parents("form").find("#snap_reason").val(); 
               var note = $(this).parents("form").find("#snap_note").val();
               var base = $(this).parents("form").find("#project_name_snap :selected").data("base");

               
               $.ajax({
                    url: "/addsnap",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        project: project,
                        reason: reason,
                        note: note,
                        base: base
                    }),
                    complete: function (data) {
                        $('#snaps_table').html(data.responseText);
                        $('#add_snap_button').popover('hide')
                        //document.location.reload(true);
                    }
                });

        });
    },

    showAllSnaps = function(){
        $.ajax({
          url: "/allsnaps",
          dataType: "html",
          complete: function(data){
            $('#snaps_table').html(data.responseText);
          }
        });
    },

    showManualSnaps = function(){
        $.ajax({
          url: "/manualsnaps",
          dataType: "html",
          complete: function(data){
            $('#snaps_table').html(data.responseText);
          }
        });
    };


    return{
        init: init,
        showAllSnaps: showAllSnaps,
        showManualSnaps: showManualSnaps
    }
})();
$( document ).ready(function() {
    snapshot.init();
});