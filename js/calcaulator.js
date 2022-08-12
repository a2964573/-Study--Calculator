const display=document.getElementById("display");

let calculateMeterials=["",""];
let operator=null; //연산자
let displayValue=null;
let result=null; //결과 값
let resetCheck=0; //리셋 확인 0=불필요, 1=필요
let isPoint=false;

//==========버튼이벤트==========//
//숫자 버튼 이벤트
function onClickNumberButton(value){
    if(resetCheck === 0){
        if(operator === null){ //연산자가 null이라면 진행(연산자 미입력은 첫번째 항 입력이 끝나지 않았다는 것을 의미)
            calculateMeterials[0]+=value; //첫번째 항에 입력
        } else{ //연산자가 null이 아니라면 진행(연산자를 입력은 첫번째 항 입력이 끝났다는 것을 의미)
            if(calculateMeterials[1]===""){ //두번째 항을 처음 입력할 때 초기화하고 진행. 여러번 계산하게 될 경우 리셋조건문에서 초기화 진행
                display.value="";
            }
            calculateMeterials[1]+=value; //두번째 항에 입력
        }
        display.value+=value;
    }else{ //리셋 조건문 실행
        if(calculateMeterials[0] !== result){ //연산자를 누르지 않고 계산을 이어나가면 결과 값을 첫번째 항에 할당하지 않기 때문에 초기화 이벤트 실행 
            onClickClear(); //초기화 버튼 이벤트과 동일
            display.value+=value;
            calculateMeterials[0]+=value;
        }else{ //연산자를 눌러 계산을 이어나가면 결과 값을 첫번째 항에 할당하기 때문에 동일
            calculateMeterials[1]=""; //두번째 항 초기화
            display.value="";
            display.value+=value;
            calculateMeterials[1]+=value;
            resetCheck=0; //리셋 값 초기화로 조건문 리셋 조건문 탈출
        }
    }
}

//연산자 버튼 이벤트
function onClickOperator(value){
    typeCasting();
    if(operator !== null && calculateMeterials[1] !== ""){ //연산자가 null이 아니거나 두번째 항이 빈 값이 아니면 실행
        if(displayValue !== result){ //표시된 값과 결과 값이 다르면 실행
            calculate(operator);
        }
    }
    operator=value; //연산자 변수에 버튼에 저장된 값 할당
    isPoint=false;
}

//양수 음수 전환 버튼 이벤트
function onClickChangeSign(){
    typeCasting();
    if(displayValue === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
        switch(Math.sign(calculateMeterials[0])){ //1=양수, -1=음수
            case 1: 
                calculateMeterials[0]=calculateMeterials[0]*-1; //양수면 -1을 곱해 음수로 전환
                display.value=calculateMeterials[0];
            break;
            case -1:
                calculateMeterials[0]=Math.abs(calculateMeterials[0]); //음수면 Math함수를 이용해 절댓값(양수)로 전환
                display.value=calculateMeterials[0];
            break;
        }
    } else{ //두번째 항 입력하기 전(연산자 입력 후) or 후
        switch(Math.sign(calculateMeterials[1])){
            case 1: 
                calculateMeterials[1]=calculateMeterials[1]*-1; //양수면 -1을 곱해 음수로 전환
                display.value=calculateMeterials[1];
            break;
            case -1:
                calculateMeterials[1]=Math.abs(calculateMeterials[1]); //음수면 Math함수를 이용해 절댓값(양수)로 전환
                display.value=calculateMeterials[1];
            break;
        }
    }
}

//계산 버튼 이벤트
function onClickCalculate(){
    typeCasting();
    if(displayValue !== result){  //결과 값이 현재 표시되는 값과 같지 않을 경우 진행(일반적인 계산)
        calculate(operator);
    } else{ //결과 값과 현재 표시되는 값이 같을 경우 진행(반복 계산)
        calculateMeterials[0]=result; //첫번째 항의 값을 결과 값으로 재할당
        calculate(operator);
    }
}

//소수점 버튼 이벤트
function onClickDicimalPoint(value){
    typeCasting();
    if(0 < display.value.length && isPoint === false){
        if(displayValue === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
            calculateMeterials[0]+=value; //첫번째 항에 소수점 추가
        } else{ //두번째 항 입력하기 전이나 후
            calculateMeterials[1]+=value; //두번째 항에 소수점 추가
        }
        display.value+=value; //표시된 값에 소수점 추가
        isPoint=true; //소수점 추가로 소수점 있음 표시
    }
}

//백스페이스 버튼 이벤트
function onClickBackSpace(){
    typeCasting();
    let temporaryStorage=""; //임시저장소에 빈 문자열 할당   
    if(displayValue === result){ //결과 값이 표시된 상황일 때
        calculateMeterials[0]=result; //결과 값을 첫번째 항으로 할당
    } else{ //결과 값이 표시된 상황이 아닐 때
        for(let i=0; i<display.value.length-1; i++){ //표시된 값의 길이보다 하나 적게 반복
            temporaryStorage+=display.value.charAt(i); //임시 저장소에 표시된 값을 하나씩 할당
        }
        display.value=temporaryStorage; //하나 적게 저장된 임시 저장소의 값을 표시된 값으로 변경
    }    

    if(displayValue === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
        calculateMeterials[0]=display.value; //첫번째 항에 표시된 값을 할당
    } else{ //두번째 항 입력하기 전이나 후
        calculateMeterials[1]=display.value; //두번째 항에 표시도힌 값을 할당
    }
    dicimalPointCheck();
}

//마지막 작업 삭제 버튼 이벤트
function onClickClearEntry(){
    typeCasting();
    if(displayValue === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
        calculateMeterials[0]=""; //첫번째 항 삭제
        isPoint=false;
        display.value="";
    } else{ //두번째 항 입력하기 전이나 후
        calculateMeterials[1]=""; //두번째 항 삭제
        isPoint=false;
        display.value="";
    }
}

//초기화 버튼 이벤트
function onClickClear(){
    calculateMeterials=["",""];
    displayValue=null;
    operator=null;
    result=null;
    resetCheck=0;
    isPoint=false;
    display.value="";
}
//==========버튼이벤트==========//

//==========함수==========//
//계산 함수
function calculate(operator){
    if(calculateMeterials[1] === ""){ //첫번째 항 값과 연산자만 누르고 결과 버튼 클릭 할 경우
        calculateMeterials[1]=calculateMeterials[0]; //첫번째 항 값을 두번째 항 값에 할당해 계산 진행
    }
    switch(operator){
        case "+": 
            result=calculateMeterials[0]+calculateMeterials[1];
        break;
        case "-": 
            result=calculateMeterials[0]-calculateMeterials[1];
        break;
        case "*": 
            result=calculateMeterials[0]*calculateMeterials[1];
        break;
        case "/": 
            result=calculateMeterials[0]/calculateMeterials[1];
        break;
        default : //연산자가 null이거나 계산기 내 선언되지 않은 것일 때 에러 발생 및 초기화
            alert("Error!");
            onClickClear();
        break;
    }
    calculateMeterials[0]=result;
    display.value=result; //결과 값으로 변경
    resetCheck=1; //계산 완료 후 리셋 필요 알림    
    dicimalPointCheck();
}

//소수점 확인 함수
function dicimalPointCheck(){
    let pointCheck=0; //소수점 체크용 변수
    for(let i=0; i<display.value.length; i++){
        if(display.value.charAt(i) === "."){ //스캔하는 동안 소수점이 발견되면 체크
            pointCheck++;
        }
    }
    if(pointCheck === 0){ //체크되지 않으면 소수점 없음
        isPoint=false;
    } else{ //체크되면 소수점 있음
        isPoint=true;
    }
}

//형변환 함수
function typeCasting(){
    displayValue=Number(display.value); //표시된 값 숫자로 형변환
    calculateMeterials[0]=Number(calculateMeterials[0]); //첫번째 항 값 숫자로 형변환
    if(calculateMeterials[1] !== ""){ //두번째 항이 빈 값이 아니면 실행(처음 연산자 누를 때 형변환이 되서 0이 되는 걸 막기 위함)
        calculateMeterials[1]=Number(calculateMeterials[1]); //두번째 항 값 숫자로 형변환
    }
}
//==========함수==========//
