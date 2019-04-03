function myMachineA(p1) {
 	/*
	It can take an assignment statement (as above), split off the RHS and send it to
	an E machine, get the E result value, and send a Store message to a D machine. On
	getting the Stored result message, the A machine returns the value to the I machine
	and becomes ready for another statement.
 	*/
	alert(p1);
        exp=p1.split(/[=.]/);
        rhs=exp[1];
        alert(rhs);
        //send RHS to machine E and get result back in resE
        resE=myMachineE(rhs);
        console.log(resE);
        //send store msg to D, get result from 
        // myMachineD();
        //return to I machine
        //myMachineI();
}
  
function myMachineE(p2) {
    /*
	E = Expression machine. It can take an arithmetic expression (a polynomial as above) and split off each
	term and send each term to a T machine and get the result integer back and sum all the results from all the terms
	and return that sum to its sender. It has an array large enough to store the value of each term in the polynomial
	it gets (to simplify its life, and help make visible what is going on).
    */
    //separate polynomial term and send tern to machine T
    str=rhs.split("+");
    var polyterm=[];
    str.forEach(function (char, idx) {
    	polyterm.push(char);
    });
    resT=myMachineT(polyterm); 
    //get result back from machineT and sum it all
    var total=0;
    for( var idx = 0; idx < resT.length ; ++idx ){
	   total = total+parseInt(resT[idx]);
	}
    console.log(total);
    //send result back to machineA
    return total;
}

function myMachineT(p1) {
    /*
	T = Term machine. It can take a term (of multiplied factors) and split off each factor. If the factor is a
	constant, it can be used directly. If the factor is a variable, it can send it to a D machine and get the result
	integer value back. If the factor is an exponentiation, it can send this to a P machine and get the result integer
	value back. It can then compute the product of all these values and return the result to its sender. It also has an
	array for temporary storage of the various factors it splits off.
    */
}

function myMachineP(p1) {
    /*
	P = Power machine. It can take a power expression consisting of a variable and a constant integer exponent.
	It returns the result to its sender. It sends a Load message with the variable to a D machine, then uses the result
	value to compute the exponential value and return it to the sender. It has a 2-element temporary array.
    */
}

function myMachineD(p1) {
    /*
	D = Data machine. It can take two messages. The first is a Load message with the name (a letter) of a
	variable. It returns the variable's current value to the sender. The second is a Store message with both the name
	of variable and a constant value. It stores the value in the variable's box (a slot in an internal array), and returns
	a STORED message. It has an internal array for 26 variables.
    */
}

function myMachineI(p1) {
    /*
	I = Input machine. This machine has the next 5 input statements to be computed. It sends each statement
	in a message to the A machine. It puts the result value next to the current statement and then makes the next
	statement current.
    */
}
