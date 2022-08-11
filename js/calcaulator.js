const display=document.getElementById("display");

let calculateMeterials=[0,0];
let operator=null; //연산자
let displayValue=null;
let result=null; //결과 값
let resetCheck=0; //리셋 확인 0=불필요, 1=필요


//숫자 버튼 이벤트
function onClickNumberButton(value){
    if(resetCheck === 0){
        if(operator === null){ //연산자가 null이라면 진행(연산자 미입력은 첫번째 항 입력이 끝나지 않았다는 것을 의미)
            calculateMeterials[0]+=value; //첫번째 항에 입력
        } else{ //연산자가 null이 아니라면 진행(연산자를 입력은 첫번째 항 입력이 끝났다는 것을 의미)
            if(calculateMeterials[1]===0){ //두번째 항을 처음 입력할 때 초기화하고 진행. 여러번 계산하게 될 경우 리셋조건문에서 초기화 진행
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
            resetCheck=0; //리셋 값 초기화로 조건문 리셋 조건문 탈출
        }
    }
    console.log("[0]: ", calculateMeterials[0], "[1]: ", calculateMeterials[1]);
}

//연산자 버튼 이벤트
function onClickOperator(value){
    typeCasting();

    if(displayValue === result){ //계산을 완료한 상태에서 연산자를 누르면 발생하는 조건문
        calculateMeterials[0]=result; //연산자를 눌러 계산을 이어나가면 결과 값을 첫번째 항에 할당
    }

    operator=value;
}

//형변환 함수
function typeCasting(){
    displayValue=Number(display.value);
    calculateMeterials[0]=Number(calculateMeterials[0]);
    calculateMeterials[1]=Number(calculateMeterials[1]);
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
    console.log("[0]: ", calculateMeterials[0], "[1]: ", calculateMeterials[1], "result: ", result);
}

//계산 함수
function calculate(operator){
    if(operator === null){ //첫번째 항 숫자 입력 후 결과버튼 눌렀을 때
        operator="+";
        calculateMeterials[1]=calculateMeterials[0];
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
    resetCheck=1; //계산 완료 후 리셋 필요 알림
}

//마지막 작업 삭제 버튼 이벤트
function onClickClearEntry(){
    typeCasting();

    if(displayValue === result || operator === null){ //표시되는 값과 결과 값이 같거나 첫번째 항만 입력 했을 때
        calculateMeterials[0]=0; //첫번째 항 삭제
        display.value="";
    } else{ //두번째 항 입력하기 전이나 후
        calculateMeterials[1]=0; //두번째 항 삭제
        display.value="";
    }
}

//초기화 버튼 이벤트
function onClickClear(){
    calculateMeterials=[0,0];
    displayValue=null;
    operator=null;
    result=null;
    resetCheck=0;
    display.value="";
}
