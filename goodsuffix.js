const fs = require("fs");

let [,,str_file, substr_file] = [...process.argv];
let string = fs.readFileSync(str_file, "utf-8");
let sub_string = fs.readFileSync(substr_file, "utf-8");

let string_length = string.length;
let sub_length = sub_string.length;

let z_function = new Array();

for (let i = 0; i < sub_length; i++){
	z_function[i] = 0;
}

for (let i = 1, max_index = 0, max_z = 0; i < sub_length; ++i){
	if (i <= max_z) z_function[i] = Math.min(max_z - i + 1, z_function[i - max_index]);
	while (i + z_function[i] < sub_length && sub_string[sub_length - 1 - z_function[i]] == sub_string[sub_length - 1 - (i + z_function[i])]) 
		z_function[i]++;
	if (i + z_function[i] - 1 > max_z){
		max_index = i;
		max_z = i + z_function[i] - 1;
	}
}

let suff_shifts = new Array();

for (let i = 0; i <= sub_length; i++)
	suff_shifts[i] = sub_length;


for (let i = sub_length - 1; i > 0; i--) 
	suff_shifts[sub_length - z_function[i]] = i;

for (let i = 1, j = 0; i < sub_length; i++){
	if (i + z_function[i] == sub_length)
		for (j; j <= i; j++)
			if (suff_shifts[j] == sub_length) suff_shifts[j] = i;
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
	}	
	i += suff_shifts[sub_length - j];
	
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
