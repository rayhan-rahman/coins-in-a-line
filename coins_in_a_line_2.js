//var coin_values = [10, 8, 11, 9, 7, 5, 12, 6];
var coin_values = [3, 5, 7, 11, 13, 17, 19, 23];
var button_ids = ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8"];
var p1_buttons = ['#p1_1', '#p1_2', '#p1_3', '#p1_4'];
var p2_buttons = ['#p2_1', '#p2_2', '#p2_3', '#p2_4'];
var player_one_total = 0;
var player_two_total = 0;
var cur_left = 0;
var cur_right = coin_values.length-1;
const player_one = 1;
var p1_turn_no = 1;
const player_two = 2;
var p2_turn_no = 1;
var cur_turn = player_one;
var M = new Array(coin_values.length);
function initialize(){
	shuffle(coin_values);
	for (let i = 0; i < coin_values.length; ++i){
		M[i] = new Array(coin_values.length);
	}
	for (let i = 0; i < coin_values.length-1; ++i){
		M[i][i+1] = new Array(2);
		let value = Math.max(coin_values[i], coin_values[i+1]);
		let choice = i;
		if (coin_values[i+1] > coin_values[i]){
			choice = i+1;
		}
		M[i][i+1] = [value, choice];
	}

	for (let k = 3; k < coin_values.length; k = k+2){
		for (let i = 0; i < coin_values.length - k; ++i){
			let j = i + k;
			let a1 = M[i+1][j-1][0];
			let a2 = M[i+2][j][0];
			let i_val = Math.min(a1, a2) + coin_values[i];
			let b1 = M[i][j-2][0];
			let b2 = M[i+1][j-1][0];
			let j_val = Math.min(b1, b2) + coin_values[j];
			let value = Math.max(i_val, j_val);
			let choice = i;
			if (j_val > i_val){
				choice = j;
			}
			M[i][j] = [value, choice];
		}
	}

	for (let i = 0; i < button_ids.length; ++i){
		let b = $(button_ids[i])[0];
		b.value = coin_values[i];
		b.innerHTML = coin_values[i].toString();
		b.disabled = "disabled";
		(function(j){
			b.onclick = (function(){
				button_clicked(j);
			});
		})(i);
	}

	var computer_choice = M[0][coin_values.length-1][1];

	$(button_ids[0]).prop("disabled", false);
	$(button_ids[button_ids.length-1]).prop("disabled", false);

	//wait(2000);
	$(button_ids[computer_choice])[0].click();

}

function button_clicked(i){
	let status = $('.game_status')[0];
	if (i === cur_left){ // left coin was picked
		$(button_ids[i]).prop("disabled", true);
		if (i+1 < cur_right){
			$(button_ids[i+1]).prop("disabled", false);
		}
		cur_left = i+1;

	}else{ // i === right coin was picked
		$(button_ids[i]).prop("disabled", true);
		if (i-1 > cur_left){
			$(button_ids[i-1]).prop("disabled", false);
		}
		cur_right = i-1;
	}
	if (cur_turn === player_one){
		//wait(2000);
		player_one_total += coin_values[i];
		cur_turn = player_two;
		let b = $(p1_buttons[p1_turn_no-1])[0];
		b.innerHTML = coin_values[i].toString();
		let t = $('#p1_total')[0];
		t.innerHTML = player_one_total.toString();
		p1_turn_no += 1;
		status.innerHTML = "<br><br>Game in progress.<br>It's your turn now."
	}else{
		player_two_total += coin_values[i];
		cur_turn = player_one;
		let b = $(p2_buttons[p2_turn_no-1])[0];
		b.innerHTML = coin_values[i].toString();
		let t = $('#p2_total')[0];
		t.innerHTML = player_two_total.toString();
		p2_turn_no += 1;
		status.innerHTML = "<br><br>Game in progress.<br>It's Computer's turn now."
		if (cur_right > cur_left){
			let computer_choice = M[cur_left][cur_right][1];
			$(button_ids[computer_choice])[0].click();
		}

	}
	if (p2_turn_no === coin_values.length/2 + 1){ //game over
		console.log("Computer's total: " + player_one_total.toString());
		console.log("Your total: " + player_two_total.toString());
		if (player_one_total > player_two_total){
			console.log("Computer wins");
			status.innerHTML = "<br><br>Game has ended.<br>Computer has won."
		}else if (player_one_total < player_two_total){
			console.log("Player two wins");
			status.innerHTML = "<br><br>Game has ended.<br>You have won."
		}else{
			console.log("It's a tie");
			status.innerHTML = "<br><br>Game has ended.<br>It's a tie."
		}
	}
}

function shuffle(array){
	let counter = array.length;
	while (counter > 0){
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

window.onload = initialize;