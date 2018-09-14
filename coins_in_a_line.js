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
function initialize(){
	shuffle(coin_values);
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
	$(button_ids[0]).prop("disabled", false);
	$(button_ids[button_ids.length-1]).prop("disabled", false);
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
		player_one_total += coin_values[i];
		cur_turn = player_two;
		let b = $(p1_buttons[p1_turn_no-1])[0];
		b.innerHTML = coin_values[i].toString();
		let t = $('#p1_total')[0];
		t.innerHTML = player_one_total.toString();
		p1_turn_no += 1;
		status.innerHTML = "<br><br>Game in progress.<br>Player Two's turn now."
	}else{
		player_two_total += coin_values[i];
		cur_turn = player_one;
		let b = $(p2_buttons[p2_turn_no-1])[0];
		b.innerHTML = coin_values[i].toString();
		let t = $('#p2_total')[0];
		t.innerHTML = player_two_total.toString();
		p2_turn_no += 1;
		status.innerHTML = "<br><br>Game in progress.<br>Player one's turn now."

	}
	if (p2_turn_no === coin_values.length/2 + 1){ //game over
		console.log("Player one total: " + player_one_total.toString());
		console.log("Player two total: " + player_two_total.toString());
		if (player_one_total > player_two_total){
			console.log("Player one wins");
			status.innerHTML = "<br><br>Game has ended.<br>Player One has won."
		}else if (player_one_total < player_two_total){
			console.log("Player two wins");
			status.innerHTML = "<br><br>Game has ended.<br>Player Two has won."
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

window.onload = initialize;