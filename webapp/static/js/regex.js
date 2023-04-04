$(function ($) {
    //jquery로 input type = text 박스에 숫자와 특수문자 ^만입력받기
    $('#id값').on('input', function (){
        const regex = /^[0-9^]*$/;
        const value = $(this).val();

        if(!regex.test(value)){
            $(this).val(value.replace(/[^0-9]/g, ''));
        }
    });
});