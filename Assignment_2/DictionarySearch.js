var dictionary = GenerateWordArray();
var prefix = "tab";

function GenerateWordArray()
{
	var fileSystem = require('fs');
	var words = fileSystem.readFileSync("./words.txt").toString().split("\n");
	words.sort();
	return words;
}

function BinarySearch()
{
	var low = 0;
	var high = dictionary.length-1;
	var mid = Math.round((high/26) * (prefix.charCodeAt(0)-96));

	while (low <= high)
	{
		if(dictionary[mid].startsWith(prefix))
		{
			return LinearSearch(mid);
		}
		else if(dictionary[mid] < prefix)
		{
			low = mid +1;
		}
		else if(dictionary[mid] > prefix)
		{
			high = mid - 1;
		}

		mid = Math.round((low+high)/2);
	}

	console.log("Found 0 words with prefix " +prefix);
	return -1;
}

function LinearSearch(a_Index)
{
	var words = [];
	var upIndex = a_Index;
	var downIndex = upIndex-1;
	var upFinished = false;
	var downFinished = false;

	while(!upFinished || !downFinished)
	{
		if(!upFinished && dictionary[upIndex])
		{
			if(dictionary[upIndex].startsWith(prefix))
			{
				words[words.length] = dictionary[upIndex];
				upIndex ++;
				if(upIndex > dictionary.length-1)
				{
					upFinished = true;
				}
			}
			else 
			{
				upFinished = true;
			}
		}

		if(!downFinished && dictionary[downIndex])
		{
			if(dictionary[downIndex].startsWith(prefix))
			{
				words[words.length] = dictionary[downIndex];
				downIndex --;
				if(downIndex < 0)
				{
					downFinished = true;
				}
			}
			else {
				downFinished = true;
			}
		}

	}

	console.log("Found " +words.length +" words with prefix " +prefix);
	return words;
}

BinarySearch();
