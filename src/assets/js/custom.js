$(document).ready(function(){
    $("#menuIcon").click(function(){
        $(".leftMenu").toggleClass("active");
        $(".rightMenu").toggleClass("active");
    });

    $(".accordion-item").hover(function(){
        $(".leftMenu").removeClass("active");
        $(".rightMenu").removeClass("active");
    });
    
  
    $(".adminSidebar").mCustomScrollbar({
        theme: "inset-dark",
        scrollButtons: {enable:true}
      });


     
});

 