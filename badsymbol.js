const fs = require("fs");

let [,,str_file, substr_file] = [...process.argv];
let string = fs.readFileSync(str_file, "utf-8");
let sub_string = fs.readFileSync(substr_file, "utf-8");

let string_length = string.length;
let sub_length = sub_string.length;

let most_right_positions = new Array();
for (let i = 0; i < sub_length; i++){
	most_right_positions[sub_string[i]] = i;
}

let all_entries = new Array();
let i = 0;

while (i < string_length){
	let j = 0;
	while (sub_string[sub_length - j - 1] == string[i + sub_length - j - 1] && j != sub_length){
		j++;
	}
	if (j == sub_length){
		all_entries.push(i + 1);
		i += 1;
	}
	else {
		let shift = Math.max(sub_length - most_right_positions[sub_string[sub_length - j - 1]] - j - 1, 1);
		i += shift;
	}
	
}

if (all_entries[0]){
	let output = "";
	for (let i = 0; i < all_entries.length; i++){
		output += all_entries[i] + " ";
	}
	console.log(`All entries of this substring in this string: ${output}`);
}
else
	console.log("This string doesn't contain this substring");