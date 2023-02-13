$(function($){

    //검색 시 값을 입력하지않고 검색 버튼을 눌렀을때 alert창 띄우기, if문으로 하나하나 조건걸지말고 한번에 들어있는 값 이용
    $('#search').click(function(){
        if($('#search option:selected').text() != '전 체' && $('#key').val() === ''){ // select박스의 선택한 값의 텍스트가 전체가 아닐때와 입력한 검색어가 공백이면
            alert($('#search option:selected').text() + '를 입력해주세요');  //search 아이디 값의 선택된 값을 text로 가져옴
            $('#key').focus(); //검색어입력으로 focus
            return false;
        }
        $('#form_list').attr('target', '_self') //현재 창에서 실시 -> 새 창이 뜨는 것을 방지한다.
        $('#form_list').attr('action', '주소').submit(); //입력한 form들의 값을 넘김
    });
})