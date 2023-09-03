function fun1() {
    console.log(1);
}

function fun2(call) {
    call();
    console.log(2);

}


function fun3() {
    console.log(3);
}



fun1();
fun2(fun3);

