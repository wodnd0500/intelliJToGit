$(function($){
    //테이블 세로 줄 마우스오버 이벤트
    $(document).ready(function (e){ //페이지 시작하자마자 그려지는
        $('#tbl_1 tr').each(function (index,element){ //테이블 전체 tr의 index를 구한다. ex) 26줄이 있으면 index도 26까지
            //console.log("trIndex:" + index);
            $(this).children('td').each(function (index,element){ //테이블 전체 td의 인덱스
               $(this).onmouseover(function (){ //마우스가 올라갈때, mouseover도가능
                   //console.log("tdIndex:" + index);  내가선택한 td의 index값
                   $('#tbl_1 td:nth-child('+(index + 1) +')').css('background-color','orange'); // :nth-child(n)는 형제요소중 n번째 요소 선택, 내가 선택한 index요소의 다음 열의 같은 index값
               })
                $(this).onmouseout(function (){ //마우스 밖으로 나갔을때 배경색 초기화
                    $('#tbl_1 td').css('background-color','');
                })
            });
        });
    });

})
