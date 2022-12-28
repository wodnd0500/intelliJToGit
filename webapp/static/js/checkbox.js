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

    //체크박스 비활성화와 활성화

    $(document).on('click', 'input[name=chk]', function (){
       var t = $('input:checkbox[name=chk]').index(this);

       var checkFlag = $('input:checkbox[name=chk]').eq(t).is(':checked');
       var checkLength = $('input:checkbox[name=chk]').length;

       //현재 체크박스가 true일 시 다음 체크박스 활성화
        if(checkFlag == true){
            $('input:checkbox[name=chk]').eq(t+1).removeAttr("disabled");
        }
        //첫번째 체크박스 체크:false 일때 2,3번째 비활성화
        else if(checkFlag == false){
            for(var i = 1; i<checkLength; i++){
                $('input:checkbox[name=chk]').eq(i).attr("disabled",true);
                $('input:checkbox[name=chk]').eq(i).prop('checked',false);
            }
        }
        // 현재 체크박스 체크: false일때 그 다음 체크박스 비활성화
        else{
            for(var k = t; k <checkLength; k++){
                $('input:checkbox[name=chk]').eq(k+1).attr("disabled",true);
                $('input:checkbox[name=chk]').eq(k+1).prop('checked',false);
            }
        }
    })
})