const display=document.getElementById("display");

let calculateMeterials=[0,0];
let operator=null; //연산자
let result=null; //결과 값
let reset=0; //리셋 확인 0=불필요, 1=필요


//숫자 버튼 이벤트
function onClickNumberButton(value){
    if(reset === 0){
        if(operator === null){ //연산자가 null이라면 진행(연산자 미입력은 첫번째 항 입력이 끝나지 않았다는 것을 의미)
            calculateMeterials[0]+=value; //첫번째 항에 입력
        } else{ //연산자가 null이 아니라면 진행(연산자를 입력은 첫번째 항 입력이 끝났다는 것을 의미)
            if(String(calculateMeterials[0]) === display.value){ //현재 저장되어 있는 첫번째 항 값과 표시되는 값이 같다면 초기화
                //++나중에 확실히 알아볼 것. 한번 사용하고 사용되지 않는 코드라 calculateMeterials[1]===0을 넣어도 동일하게 작동(?)
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
            calculateMeterials[1]=0; //두번째 항 초기화
            display.value="";
            display.value+=value;
            calculateMeterials[1]+=value;
            reset=0; //리셋 값 초기화로 조건문 리셋 조건문 탈출
        }
    }
}

//연산자 버튼 이벤트
function onClickOperator(value){
    if(Number(display.value) === result){ //계산을 완료한 상태에서 연산자를 누르면 발생하는 조건문
        calculateMeterials[0]=result; //연산자를 눌러 계산을 이어나가면 결과 값을 첫번째 항에 할당
    } else{
        calculateMeterials[0]=Number(calculateMeterials[0]); //문자열로 입력 받은 값 숫자로 형변환
    }

    // display.value=""; //우측 항 입력 받기 위해 value 초기화

    switch(value){
        case "+": 
            operator=value; //연산자 + 할당
        break;
        case "-": 
            operator=value; //연산자 - 할당 
        break;
        case "*": 
            operator=value; //연산자 * 할당 
        break;
        case "/": 
            operator=value; //연산자 / 할당
        break;
    }
}

//계산 버튼 이벤트
function onClickCalculate(){
    calculateMeterials[1]=Number(calculateMeterials[1]); //두번째 항 형변환
    if(Number(display.value) !== result){  //결과 값이 현재 표시되는 값과 같지 않을 경우 진행(일반적인 계산)
        calculate();
    } else{ //결과 값과 현재 표시되는 값이 같을 경우 진행(반복 계산)
        calculateMeterials[0]=result; //첫번째 항의 값을 결과 값으로 재할당
        calculate();
    }
}

//계산 함수
function calculate(){
    if(operator === null){ //첫번째 항 숫자 입력 후 결과버튼 눌렀을 때
        operator="+";
        calculateMeterials[0]=Number(calculateMeterials[0]);
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
        default : //이 외의 연산자 혹은 연산자가 null일 경우 발생
            alert("Error!");
        break;
    }
    display.value=result; //결과 값으로 변경
    reset=1; //계산 완료 후 리셋 필요 알림
}

//초기화 버튼 이벤트
function onClickClear(){
    calculateMeterials=[0,0];
    operator=null;
    result=null;
    reset=0;
    display.value="";
}

//마지막 작업 삭제 버튼 이벤트
function onClickClearEntry(){
    if(Number(display.value) === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
        calculateMeterials[0]=0; //첫번째 항 삭제
        display.value="";
    } else{ //두번째 항 입력하기 전이나 후
        calculateMeterials[1]=0; //두번째 항 삭제
        display.value="";
    }
}
