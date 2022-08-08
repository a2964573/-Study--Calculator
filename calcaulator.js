const display=document.getElementById("display");

let calculateNumberLeft=null; //좌측 항
let calculateNumberRight=null; //우측 항
let operator=null; //연산자
let result=null; //결과값
let reset=0; //리셋 확인 0=불필요, 1=필요

//숫자 버튼 클릭 이벤트
function onClickNumberButton(value){ //버튼 클릭시 
    if(reset===1){ //reset=1 >> 초기화 함수 실행
        onClickClear();
        display.value+=value; //input:text 숫자 버튼의 value 값 입력(문자열)
    }else{ //reset!=1 >> 진행
        display.value+=value; //input:text 숫자 버튼의 value 값 입력(문자열)
    }
}

//연산자 버튼
function onClickOperator(value){
    calculateNumberLeft=Number(display.value); //input:text value 값 Number 형변환 및 좌측 항에 할당
    display.value=""; //우측 항 입력 받기 위해 value 초기화

    switch(value){
        case "+": 
            operator="+"; //연산자 + 선언
            break;
        case "-": 
            operator="-"; //연산자 - 선언 
            break;
        case "*": 
            operator="*"; //연산자 * 선언 
            break;
        case "/": 
            operator="/";  //연산자 / 선언
            break;
    }
}

//계산 버튼
function onClickCalculate(){
    calculateNumberRight=Number(display.value); //display 값 Number 형변환 및 우측 항에 할당
    switch(operator){
        case "+": 
            result=calculateNumberLeft+calculateNumberRight;
            break;
        case "-": 
            result=calculateNumberLeft-calculateNumberRight;
            break;
        case "*": 
            result=calculateNumberLeft*calculateNumberRight;
            break;
        case "/": 
            result=calculateNumberLeft/calculateNumberRight;
            break;
    }
    display.value=result; //input:text value 값에 결과값 할당

    //계산 완료 후 초기화
    result=null;
    operator=null;
    calculateNumberLeft=null; 
    calculateNumberRight=null;
    reset=1; //계산 완료 후 리셋 필요 알림
}

//초기화 버튼
function onClickClear(){
    result=null;
    operator=null;
    calculateNumberLeft=null; 
    calculateNumberRight=null;
    reset=0;
    display.value="";
}