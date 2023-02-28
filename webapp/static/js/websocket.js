$(function ($) {


    //웹 소켓 방식
    var wsUri = "ws://localhost:9639/"; // 대도데몬 프로그램 포트(9639) 입력
    var websocket;
    var output;
    var readyState = 3;
    var date;
    var count = 0;
    var cancelModal = false
    function init() {
        //output = document.getElementById("output");
        console.info('websocket open checke ', readyState);

        if (readyState != 0 && readyState != 1) {
            testWebSocket()
            //console.log("처음 실행");
        };
    }

    function testWebSocket() {
        websocket = new WebSocket(wsUri);
        cancelModal = true
        websocket.onopen = function (evt) {
            $('#remote_use').attr('disabled',false); //testWebSocket  불러올 시 remote_use 및 remote_charger 버튼 disabled 해제
            $('#remote_charger').attr('disabled',false);
            console.info('websocket onOpen ')
            //console.log("cancelModal:" + cancelModal);
            onOpen(evt)
            readyState = websocket.readyState;
            console.info('websocket onOpen ', readyState);
            console.info('websocket.readyState ', websocket.readyState);
        };

        websocket.onclose = function (evt) { //웹소켓을 재연결하는 코드 및 연결 끊겼을 시
            $('#remote_use').attr('disabled',true);
            $('#remote_charger').attr('disabled',true);
            //console.log("취소버튼 누르면 false, 아니면 true: " + cancelModal);
            switch (evt.code) {
                case 1006:
                    if(!cancelModal) {
                        //console.log("취소 확인" + cancelModal)
                        break;
                    }else {
                        count++;
                        if (count < 5) {
                            testWebSocket();
                        } else {
                            alert("서버와의 연결이 끊겼습니다.");
                            $('.modal').modal('hide');
                            terminate();
                            count = 0;
                            break;
                        }
                    }
            }
            readyState = websocket.readyState;
            console.info('websocket onClose ', readyState);
            console.info('websocket.readyState ', websocket.readyState);

        };
        websocket.onmessage = function (evt) {
            onMessage(evt)
        };
        websocket.onerror = function (evt) {
            onError(evt)
        };
    }

    function padLeft(nr, n, str) {
        return Array(n - String(nr).length + 1).join(str || '0') + nr;
    }

    /* function writeToScreen(message) {
         var pre = document.createElement("p");
         pre.style.wordWrap = "break-word";
         pre.innerHTML = message;
         output.insertBefore(pre, output.firstChild);
     }*/

    function terminate() {
        websocket.close();
    }

    function onOpen(evt) {
        //writeToScreen("서버 접속");
        console.log("서버 접속");
    }

    function onClose(evt) {
        //writeToScreen(evt.code);
        testWebSocket();
    }
    //웹소켓 수신부--
    function onMessage(evt) {
        //writeToScreen('<span style="color: blue;">응답수신 : ' + evt.data + '</span>');
        console.log('응답수신 : ' + evt.data );
        var resData = evt.data.split(',');

        console.log("resData:" + resData);
        // 0 명령어(DOCHARGE/카드충전 DISPOSE/카드배출) 1 응답코드(0001/성공  0000/실패) 2 단말기 아이디(0000000392  10자리 우측정렬 좌측Zero패딩) 3 데이터(0000010000 10자리 우측정렬 좌측Zero패딩)
        //DOCHARGE,0001,0000000392,0000010000   만원원격충전예시
        //DISPOSE,0001,0000000392,0000000001   카드한장원격배출
        if (resData[0] == 'CHARGE') {
            // 충전명령 응답 수신
            if (resData[1] != '0000') {
                console.log('응답코드 : '     + resData[1]);
                console.log('단말기아이디 : ' + resData[2]);
                console.log('응답데이터 : '   + resData[3]);
            }
            else {
                console.log('응답코드 : '     + resData[1]);
                console.log('단말기아이디 : ' + resData[2]);
                console.log('응답데이터 : '   + resData[3]);
                console.log('원격충전완료');
            }
        }
        else if (resData[0] == 'DISPOSE') {
            // 배출명령 응답 수신
            if (resData[1] != '0000') {
                console.log('응답코드 : '     + resData[1]);
                console.log('단말기아이디 : ' + resData[2]);
                console.log('응답데이터 : '   + resData[3]);
            }
            else {
                console.log('응답코드 : '     + resData[1]);
                console.log('단말기아이디 : ' + resData[2]);
                console.log('응답데이터 : '   + resData[3]);
                console.log('원격충전완료');
            }
        }
    }

    function onError(evt) {
        //writeToScreen('<span style="color: red;">에러 :</span> ' + evt.data);
        console.log("error:" + evt);
    }

    function doSends(message) {
        if (message == "Charge") {
            doCharge();
        }
        else if (message == "Dispose") {
            GetIcnoFlag = 2;
            doDispose();
        }
    }

    // 서버 통신 명령을 위한 함수 구현체
    function doCharge(message) {
        // writeToScreen("[doCharge]"); // log
        console.log("[doCharge]")
        var DeviceID = document.getElementById('device_seq2').value;
        var Data = document.getElementById('remote_value2').value;
        var sendMsg = "CHARGE" + "," + "0001" + "," + padLeft(DeviceID, 10) + "," + padLeft(Data, 10) ;
        // writeToScreen("명령송신: " + sendMsg + '\n');
        console.log("충전명령송신:" + sendMsg + '\n');
        websocket.send(sendMsg);
    }

    function doDispose(message) {
        // writeToScreen("[doDispose]"); // log
        console.log("[doDispose]");
        var DeviceID = document.getElementById('device_seq1').value;
        var Data = document.getElementById('remote_value').value;
        var sendMsg = "DISPOSE" + "," + "0001"+ "," + padLeft(DeviceID, 10) + "," + padLeft(Data, 10) ;
        // writeToScreen("명령송신: " + sendMsg + '\n');
        console.log("배출명령송신:" + sendMsg + '\n');
        websocket.send(sendMsg);
    }


    // window.addEventListener("load", init, false);

    /*window.onload = function () {
        program_run.click();
    }*/

    $(document).ready(function() {
        $('#dataTable').DataTable({
            order: [[0, '대도코인']],
            ordering: true,
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Korean.json"
            },
            drawCallback: function (settings) {
                $('#dataTable').css("display", "table");
            }
        });

    } );



    $('input[name=name]').keypress(function (ev) {
        var keyCode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keyCode === 13) {
            $('#form_list').attr('action', 'charger_remoteService').submit();
            return false;
        }
    });

    $('#search').click(function () {
        var nameVal = $('#devicename').val();
        if(nameVal == ''){
            $('#form_list').attr('action', 'charger_remoteService').submit();
        } else {
            $('#form_list').attr('action', 'charger_remoteService').submit();
        }

    });


    $('#charge_del').click(function () {
        if(confirm("데이터를 삭제하시겠습니까?")) {
            $.ajax({
                type: 'POST',
                url: window.contextPath + '/regist/charge_del',
                data: {
                    device_seq: $("#device_seq1").val()
                },
                dataType: 'json',
                success: function () {
                    alert('삭제 되었습니다.');
                    $('.modal').modal('hide');
                    location.href = window.contextPath + '/regist/charger_management';
                }
            });
        }
    });




    $("#fee_type").on("change", function() {
        var check = $("#fee_type option:selected").text();
        $('#fee_name').val(check);
    });


    // 3자리 단위마다 콤마 생성
    function addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 숫자만 입력 받기
    $("input:text[numberOnly]").on("keyup", function() {
        // $(this).val($(this).val().replace(/[^0-9]/g,""));
        // $(this).val($(this).val().replace(/[ㄱ-ㅎ | ㅏ - ㅣ | 가-힣]/ ,""));
        $(this).val($(this).val().replace(/[ㄱ-ㅎ가-힣]/g, ""));
    });


    // 신규등록 모달창 열리고 포커스
    $('#form_modal1').on('shown.bs.modal', function(){
        $("#groupName1").focus();
    });

    // 요금수정 모달창 열리고 포커스
    $('#form_modal').on('shown.bs.modal', function(){
        $("#groupName").focus();
    });

    function addComma(num) {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',');
    }


    // 신규등록 취소버튼 클릭시 초기화
    $('#cancel, .close').click(function () {
        $('#form_modal')[0].reset();
        count = 0;
        cancelModal = false
        terminate();
        var date = new Date();
        var Eyyyy = date.getFullYear()+10;
        var Syyyy = date.getFullYear();
        var mm = date.getMonth() + 1;
        var dd = date.getDate();

        mm = mm >= 10 ? mm : '0' + mm;
        dd = dd >= 10 ? dd : '0' + dd;

        var sdateFormat = Syyyy + "-" + mm + "-" + dd;
        var edateFormat = Eyyyy + "-" + mm + "-" + dd;

        // $('#sdate1').val(sdate);
        // $('#edate1').val(edate);
        sdateReset1(sdateFormat);
        edateReset1(edateFormat);
        //$('.modal').modal('hide');
    });

    $('#cancel2').click(function () {
        $('#form_modal1')[0].reset();
        count = 0;
        cancelModal = false
        terminate();
        //$('.modal').modal('hide');
    });

    $('#updCancel').click(function () {
        $('#form_modal')[0].reset();
        // sdateCo();
    });

    // $('#cardOut').click(function () {
    //     $('#cardOutModal').modal('show');
    // });


    //모달 바탕 클릭 시 닫히는 이벤트를 추가
    //그 안에 취소버튼을 누를 때 작동하는 count 초기화, cancelModal = false로
    // websocket통신을 끊는 terminate 호출
    const modal =  $('#cardOutModal')[0]; //document.getElementById와 같음, HTML DOM객체 이용시 jquery 객체의 첫번째 element가져와야함
    const modal2 = $('#cardChargerModal')[0];
    window.addEventListener('click', function(event) {
        if (event.target == modal || event.target == modal2) {
            console.log("모달 외부클릭 시");
            modal.style.display = 'none';  //모달 숨김
            modal2.style.display = 'none';
            count = 0;
            cancelModal = false
            terminate();
        }
    });

    //esc로 모달창 닫을 시 그에대한 count, cancelModal초기화 및 terminate호출
    document.addEventListener('keyup', function(e) {
        if (e.keyCode == 27) {
            console.log("esc로 닫았을 시");
            modal.style.display = 'none';
            modal2.style.display = 'none';
            count = 0;
            cancelModal = false
            terminate();
        }
    });

    $('.cardOut').click(function () {
        //testWebSocket();
        init();
        $('#cardOutModal').modal('show');
        //cancelModal = false

        var t = $(this);
        $.get('charger_remoteService_info', {
            groupSeq : t.data('groupseq'),
            deviceSeq : t.data('deviceseq'),
            // deviceType : t.data('devicetype'),
        }, function (json) {
            var data = json.data;

            $('#name1').val(json.name);
            $('#device_type2').val(json.deviceType);
            $('#device_idx1').val(json.deviceIdx);
            $('#model_type').val(json.modelType);

            var deviceType = json.deviceType;

            if(deviceType == "01"){
                $('#device_type').val("충전기");
            } else if(deviceType == "02"){
                $('#device_type').val("세탁기");
            }
            // $('#device_type').val(json.deviceType);

            $('#ip_address1').val(json.ipAddress);
            // $('#groupName').val(t.data('groupSeq'));

            $('#device_seq1').val(json.deviceSeq);

            $('#current_stock1').val(json.currentStock);

            $('#device_idx2').val(json.deviceIdx);

        })

    });


    $('#remote_use').click(function () {
        if(confirm("카드배출을 하시겠습니까?")) {
            doSends('Dispose');
            alert('카드가 배출되었습니다.');
            $('.modal').modal('hide');
            cancelModal = false;
            terminate();
            //location.href = window.contextPath + '/remote/charger_remoteService';
            /*  $.ajax({
                  type: 'POST',
                  url: window.contextPath + '/remote/remote_use',
                  data: {
                      device_seq: $("#device_seq1").val(),
                      remote_type : "01",
                      remote_value : $('#remote_value').val(),
                      user_id: $("#user_id1").val()
                  },
                  dataType: 'json',
                  success: function () {
                      alert('카드가 배출되었습니다.');
                      $('.modal').modal('hide');
                      location.href = window.contextPath + '/remote/charger_remoteService';
                  }
              });*/
        }
    });

    $('.cardCharger').click(function () {
        init();
        $('#cardChargerModal').modal('show');
        //cancelModal = false

        var t = $(this);
        $.get('charger_remoteService_info', {
            groupSeq : t.data('groupseq'),
            deviceSeq : t.data('deviceseq'),
            // deviceType : t.data('devicetype'),
        }, function (json) {
            var data = json.data;

            $('#name2').val(json.name);
            $('#device_type2').val(json.deviceType);
            $('#device_idx2').val(json.deviceIdx);
            $('#model_type2').val(json.modelType);

            var deviceType = json.deviceType;

            if(deviceType == "01"){
                $('#device_type2').val("충전기");
            } else if(deviceType == "02"){
                $('#device_type2').val("세탁기");
            }
            // $('#device_type').val(json.deviceType);

            $('#ip_address2').val(json.ipAddress);
            // $('#groupName').val(t.data('groupSeq'));

            $('#device_seq2').val(json.deviceSeq);

            $('#current_stock2').val(json.currentStock);

            $('#device_idx3').val(json.deviceIdx);


        })

    });


    $('#remote_charger').click(function () {
        if(confirm("카드충전을 하시겠습니까?")) {
            doSends('Charge');
            alert('카드가 충전되었습니다.');
            $('.modal').modal('hide');
            cancelModal = false;
            terminate();
            //location.href = window.contextPath + '/remote/charger_remoteService';
            /*  $.ajax({
                  type: 'POST',
                  url: window.contextPath + '/remote/remote_use',
                  data: {
                      device_seq: $("#device_seq2").val(),
                      remote_type : "03",
                      remote_value : $('#remote_value2').val(),
                      user_id: $("#user_id2").val()
                  },
                  dataType: 'json',
                  success: function () {
                      alert('카드가 충전되었습니다.');
                      $('.modal').modal('hide');
                      location.href = window.contextPath + '/remote/charger_remoteService';
                  }
              });*/
        }
    });



    function numberFormat(inputNumber) {
        return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function sdateReset(x) {
        $("#sdate").datepicker("setDate", x);
    };

    function edateReset(x) {
        $("#edate").datepicker("setDate", x);
    };

    function sdateReset1(x) {
        $("#sdate1").datepicker("setDate", x);
    };

    function edateReset1(x) {
        $("#edate1").datepicker("setDate", x);
    };



});