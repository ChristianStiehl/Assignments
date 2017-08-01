var dictionary = GenerateWordArray();

function GenerateWordArray()
{
	var fileSystem = require('fs');
	var words = fileSystem.readFileSync("./words.txt").toString().split("\n");
	words.sort();
	return words;
}

function BinarySearch(prefix)
{
	var low = 0;
	var high = dictionary.length-1;
	var mid = Math.round((high/26) * (prefix.charCodeAt(0)-96));

	while (low <= high)
	{
		if(dictionary[mid].startsWith(prefix))
		{
			return LinearSearch(mid, prefix);
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
	return;
}

function LinearSearch(index, prefix)
{
	var foundWords = [];
	var upIndex = index;
	var downIndex = upIndex-1;
	var upFinished = false;
	var downFinished = false;

	while(!upFinished || !downFinished)
	{
		if(!upFinished && dictionary[upIndex])
		{
			if(dictionary[upIndex].startsWith(prefix))
			{
				foundWords[foundWords.length] = dictionary[upIndex];
				upIndex ++;
			}
			else 
			{
				upFinished = true;
			}
		}
		else if(upIndex > dictionary.length-1)
		{
			upFinished = true;
		}

		if(!downFinished && dictionary[downIndex])
		{
			if(dictionary[downIndex].startsWith(prefix))
			{
				foundWords[foundWords.length] = dictionary[downIndex];
				downIndex --;
			}
			else {
				downFinished = true;
			}
		}

		else if(downIndex < 0)
		{
			downFinished = true;
		}

	}

	console.log("Found " +foundWords.length +" words with prefix " +prefix);
	return foundWords;
}

BinarySearch("tab");
BinarySearch("da");
BinarySearch("t");
BinarySearch("ar");
BinarySearch("vet");
BinarySearch("yt");
BinarySearch("kr");
BinarySearch("able");
BinarySearch("car");
BinarySearch("a");
BinarySearch("bin");
BinarySearch("est");
BinarySearch("zw");