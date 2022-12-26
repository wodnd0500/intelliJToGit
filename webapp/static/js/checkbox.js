$(function ($) {
    //체크박스를 이용한~~~
    //전체 체크박스가 체크된 상태일 경우
    $('#id').click(function (){
        //전체 체크박스가 체크된 상태일 경우
       if($('#allCheck').prop("checked")){
          //해당화면에 전체 checkbox들을 체크해준다.
          $("input[type=checkbox]").prop("checked",true);
       }else{
           //해당화면의 모든 checkbox들을 체크해제시킴
           $("input[type=checkbox]").prop("checked",false);
       }
    });


    //체크박스 두개중 둘 중 하나만 체크가 되게끔

    $('input[name=name값]').click(function (){
       if($(this).prop('checked')){ //만약 체크박스가 클릭되어있으면
           $('input[name=name값]').prop("checked",false); //checkbox 전체를 checked해제 후
           $(this).prop('checked',true);  //click한 요소만 true로 바꿔준다.
       }
    });

    $('#chkbox').click(function (){
       if(this.checked){
           $("input[name=name1값]").prop("disabled",false);
           $("input[name=name2값]").prop("disabled",true);
       }
    });
    $('#chkbox2').click(function (){
        if(this.checked){
            $("input[name=name1값]").prop("disabled",true);
            $("input[name=name2값]").prop("disabled",false);
        }
    });





})