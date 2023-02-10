$(function ($) {
    //JSTL형식
    //파일 명이 바뀔때마다, 파일확장자 체크해주어서 허용한 확장자가 아닐 시 alert으로 경고
    $('#ex_filename').change(function (e) {
        var ext = this.value.match(/\.([^\.]+)$/)[1];
        console.log("ext:" + ext); //console로 확인

        //파일 확장자 체크
        //in.Array ==> 스크립트 내에서, 배열 안에 특정 값이 포함되는지 체크,
        //toLowerCase ==> 소문자 변환
        if ($.inArray(ext.toLowerCase(), ['hwp']) == -1) { //선택한 확장자가 hwp가 아니라면 -1 == false
            alert('한글파일만 등록할 수 있습니다.' + ext);
            this.value = '';
        } else {
            alert('정상등록되었습니다.');
        }
    });

    $('#ex_upload').click(function () {
        if ($('#fileFullName').val() == '') {
            alert('업로드할 파일을 선택해 주세요');
        } else {
            $.ajax({
                type: 'POST',
                //url: '화면주소 ex)admin_update,  HAM0801I01',
                //data: $('#form_user').serialize() == 폼데이터 전체 보내기 또는
                // yyse : $('#s_yyse').val(),
                // psco : value2,
                // sjco : value,
                // wknm : $('#idno').val(),
                // flag : flag , 각각의 데이터 보내기
                dataType: 'json',
                success: function (json) {
                    //---------------switch문--------
                    /*switch (json.state) {
                        case 'T':
                            alert('변경되었습니다');
                            //페이지만 이동
                            $(location).attr('href', 'admin');

                            //데이터를 담고 페이지 이동
                            $('#form_notice').attr('action', 'a_noticeList').submit();

                            break;
                        default:
                            alert(json,message);
                            break;
                    }*/

                    //----------if문-------------
                    /*  if (json.state == 'T') {
                          $('.empty_text').css('display', 'none');
                          view_chart(json.chart);
                      } else {
                          $('.empty_text').css('display', '');
                      }
                  },
                      error : function(e) {
                      $('.empty_text').css('display', '');
                  }*/

                }
            });
        }
    });

    $('#ex_download').click(function (){
        $.ajax({
           type: "POST",
           url: "HAM0801S01", //서비스아이디 ---> 서비스 컨트롤러
           data:{
               //보낼 데이터들, 아니면 $('#form_admin').serialize()로 form_admin의 값들을 통째로 보내던지,
               yyse : $('#s_yyse').val()
           },
           dataType: 'json', //데이터 타입
           success : function (json){
               var a = json.filePath // -> 서비스단에서 out메시지나 map.put으로 하여 가져옴
               var b = json.fileName // map.put("fileName", fileName값) 이런 식으로 들어있음

               var fileDownload = document.createElement("a"); //a태그 생성
               document.body.appendChild(fileDownload);   //appendChild => 선택한 요소안에 자식요소를 추가한다. = a태그안에 fileDownload를 넣어준다
               fileDownload.href = json.filePath; //다운로드하려는 파일의 경로
               fileDownload.download = json.fileName
               fileDownload.click(); //파일다운로드 클릭
               document.body.removeChild(fileDownload);  //removeChild => 자식요소 제거

             /*  switch (json.state){
                   case 'T' :
                       alert(json.message);
                       $('#form_notice').attr('action', 'a_noticeList').submit();
                       break;

                   default:
                       alert(json.message);
                       break;
               }*/
           },
            error : function (e){
               alert('네트워크 오류입니다.');
            }
        });
        return false;
    })

    $(document).ready(function (){
        var target = $('.filebox .upload-hidden'); //filebox 클래스 안에 있는 자식 클래스 upload-hidden
        target.on('change', function (){ //값이 변경되면
            fileReader(this);
            if(window.FileReader) {
                var filename = $(this)[0].files[0].name;
            } else{
                var filename = $(this).val().split('/').pop().split('\\').pop(); //파일명만 추출
            }
            //추출한 파일명을 삽입
            $(this).siblings('.upload-name').val(filename); //siblings() 메소드는 선택한 요소의 형제(sibling) 요소 중에서 지정한 선택자에 해당하는 요소를 모두 선택한다.
            $('#fileFullName').val(fileName);

            var idx = filename.indexOf("."); //.까지의 길이를 index로 반환
            filename = filename.substring(0,idx);
            $('#fileName'),val(filename);
        });
    });

    function fileReader(input){
        if(input.files && input.files[0]){
            var fr = new FileReader();

            fr.onload = function (e){
                $('#base64').val(e.target.result);
            };
            fr.readAsDataURL(input.files[0]);
        }
    }
});