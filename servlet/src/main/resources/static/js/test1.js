/*예빈*/
function setFooter(data) {
    let CtiOnFlag = document.getElementById('CtiOnFlag').value;
    if (CtiOnFlag != '2') {
        $('#waiting').html(data.billboard.reCnt);
        $('#calling').html(data.billboard.buCnt);
        $('#after-call').html(data.billboard.awCnt);
        $('#nr').html(data.billboard.nrCnt);
    }
}

function dashBoardGauge() {
    let url = 'api/v1/procedure?procedure=PRO_INV_DASHBOARD_CENTER&param=' + rtuIdx;

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        timeout: 5000,
        error: function(e) {
            console.log("status = " + e.status);
            sessionAuthCheck(e.status);
        },

        success: function(result) {
            const dashBoardGaugeData = result;  //대쉬보드 게이지에서 쓸 총 데이터배열
            //result is
            // for (const data of result) {
            //     let obj = {};
            //     obj.rtu_idx = data.rtu_idx;             //RTU 일련번호
            //     obj.inv_idx = data.inv_idx ;            //인버터 번호
            //     obj.dc_a = data.dc_a ;                  //DC - 전류
            //     obj.dc_v = data.dc_v;                   //DC - 전압
            //     obj.kw = data.dc_kw;                    //DC - 전력
            //     obj.ac_v_rs = data.ac_v_rs;             //AC - 전압(RS)
            //     obj.ac_v_st = data.ac_v_st;             //AC - 전압(ST)
            //     obj.ac_v_tr = data.ac_v_tr;             //AC - 전압(TR)
            //     obj.ac_a_r = data.ac_a_r;               //AC - 전류(R)
            //     obj.ac_a_s = data.ac_a_s;               //AC - 전류(S)
            //     obj.ac_a_t = data.ac_a_t;               //AC - 전류(T)
            //     obj.hz = data.hz;                       //주파수
            //     obj.pf = data.pf;                       //역률
            //     obj.acc_kwh = data.acc_kwh;             //누적발전량
            //     obj.ac_kw = data.ac_kw;             	  //AC - 전력
            //     obj.capacity = data.capacity;           //인버터 용량
            //     obj.status = data.comm_stat;               //통신상태
            //     obj.day_kwh = data.day_kwh;             //금일발전량
            //     obj.day_pp_time = data.day_pp_time;     //금일발전시간
            // }

            let totalData = new Object();
            totalData.ac_kw = 0;
            totalData.dc_kw = 0;
            totalData.capacity = 0;



            //발전출력
            let circle = $('#menu01_gauge1').dxCircularGauge('instance');
            let tick = 0;
            let end = 0;
            console.log(totalData);
            if(totalData.ac_kw > 100000){
                tick = 100000;
                end = 1000000;
            }else if(totalData.ac_kw > 10000){
                tick = 10000;
                end = 100000;
            }else if(totalData.ac_kw > 1000){
                tick = 1000;
                end = 10000;
            }else if(totalData.ac_kw > 100){
                tick = 100;
                end = 1000;
            }else if (totalData.ac_kw > 10){
                tick = 10;
                end = 100;
            }else{
                tick = 1;
                end = 10;
            }
            circle.option("scale.endValue", end);
            circle.option("scale.tickInterval",tick);
            circle.option("scale.label.visible", true);
            circle.option("scale.tick.visible", true);
            circle.value(totalData.ac_kw);

        }
    });
}



//현재발전 출력 게이지1 부분
//set:현재값 end:합계
function gaugeRP(set, end) {
    let option = new options();
    let circularGauge = new dxCircularGauge();

    circularGauge.setTitle('응대율(%)');
    circularGauge.setRangeContainer('#a03e72', 'outside', 40);

    let percentage = (set / end) * 100;
    circularGauge.setValue(percentage);

    //martino 2023.05.26 바늘이 뚜꺼우므로 0~180도로 하면 0일때 바늘이 짤리는 현상으로 중심을 약간 위로 보내야 함
    //option.setGeometry(180, 0);
    option.setGeometry(185, -5);

    //option.setTick("", 0, 0, 'false', 0);
    option.setValueIndicator('black', 'triangleNeedle', 20, -30, 20);

    option.setScale(0, 100, 0, 'outside');

    option.scale.label = {};
    option.scale.label.visible = true;
    option.scale.label.indentFromTick = 10;
    option.scale.label.font = { color: 'white', size: 10 };
    option.scale.label.customizeText = function (arg) { return arg.valueText; };

    option.scale.tick = {};
    option.scale.tick.visible = true;
    option.scale.tick.length = 8;
    option.scale.tick.width = 2;
    option.scale.tick.color = '#ffffff';
    option.scale.tickInterval = 10;

    option.tooltip = {};
    option.tooltip.enabled = true;

    circle = $('#menu01_gauge1').dxCircularGauge($.extend(true, {}, option, circularGauge)).dxCircularGauge('instance');
}


function gaugeSL(set, end) {
    let option = new options();
    let circularGauge = new dxCircularGauge();

    // 제목 변경
    circularGauge.setTitle('SL(%)');

    // 범위 컨테이너 설정
    circularGauge.setRangeContainer('#6b6695', 'outside', 40); // 배경색 조정

    let percentage = (set / end) * 100;
    circularGauge.setValue(percentage);

    // 바늘 위치 조정
    option.setGeometry(185, -5);
    option.setValueIndicator('black', 'triangleNeedle', 20, -30, 20);

    // 0~100 범위로 고정
    option.setScale(0, 100, 0, 'outside');

    // 눈금 및 숫자 스타일 조정
    option.scale.label = {};
    option.scale.label.visible = true;
    option.scale.label.indentFromTick = 10; // 숫자 간격 조정
    option.scale.label.font = { color: 'white', size: 10 }; // 글씨 크기 변경
    option.scale.label.customizeText = function (arg) { return arg.valueText; };

    // 눈금 설정
    option.scale.tick = {};
    option.scale.tick.visible = true;
    option.scale.tick.length = 8;
    option.scale.tick.width = 2;
    option.scale.tick.color = '#ffffff';
    option.scale.tickInterval = 10;

    // 툴팁 설정
    option.tooltip = {};
    option.tooltip.enabled = true;

    // 게이지 생성
    circle = $('#menu01_gauge2').dxCircularGauge($.extend(true, {}, option, circularGauge)).dxCircularGauge('instance');
}

function createAllCounselors() {
    return `<div class="all_cnsl blue-box">
                <div class="box-content">
                    <div class="box-label">전체 상담사</div>
                    <div class="tot_cnsl box-value">0</div>
                </div>
                <div class="icon">👩‍💻</div>
            </div>`;
}

function createCustomerWaiting() {
    return `<div class="bright-blue-box">
                <div class="box-content">
                    <div class="box-label">고객대기</div>
                    <div class="cust_wait box-value">0</div>
                </div>
                <div class="icon">👤</div>
            </div>`;
}

function createAverageCallTime() {
    return `<div class="blue-box">
                <div class="box-content">
                    <div class="box-label">평균 통화 시간</div>
                    <div class="avg_call_time box-value">00:00</div>
                </div>
                <div class="icon">🕒</div>
            </div>`;
}

function createStatusBox(label, className) {
    return `<div class="status-box">
                <div class="status-header">${label}</div>
                <div class="status-content">
                    <div class="${className} status-value">0</div>
                </div>
            </div>`;
}

function createAgentStatus(label, className) {
    return `<div class="agent-status">
                <div class="agent-label">${label}</div>
                <div class="agent-value ${className}">0</div>
            </div>`;
}

function createGauge(id) {
    return `<div class="gauge">
                <div id="${id}"></div>
            </div>`;
}

function renderDashboard() {
    let dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = `
        <div class="header">
            <div class="title">테스트 상담현황</div>
        </div>
        
        <div class="top-row">
            ${createAllCounselors()}
            ${createCustomerWaiting()}
            ${createAverageCallTime()}
        </div>
        
        <div class="middle-container">
            <div class="middle-left">
                <div class="status-row">
                    ${createStatusBox("요청호", "request")}
                    ${createStatusBox("응대호", "response")}
                    ${createStatusBox("포기호", "give-up")}
                </div>
                <div class="gauge-container">
                    ${createGauge("menu01_gauge1")}
                    ${createGauge("menu01_gauge2")}
                </div>
            </div>
            
            <div class="middle-right">
                ${createAgentStatus("대기중", "waiting")}
                ${createAgentStatus("통화중", "calling")}
                ${createAgentStatus("후처리", "after-call")}
                ${createAgentStatus("이석중", "nr")}
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", renderDashboard);







