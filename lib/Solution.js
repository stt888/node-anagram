

/******** module Solution ********/

function Solution() {}

// function to compare if two words are equals
Array.prototype.equals = function (a) {
    if (a.length !== this.length) return false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== a[i]) {
            return false;
        }
    }
    return true;
};

// function to compare if two words are anagram
Solution.anagram = function (s1, s2) {
    //define two arrays with 26 elements to Count the number of occurrences of each identical letter in a word
    const ALPHA = 26;
    var c1 = new Array(ALPHA),
        c2 = new Array(ALPHA);
    for (var i = 0; i < c1.length; i++) {
        c1[i] = c2[i] = 0;
    }

    // use the ASCII number difference between each letter and letter 'a' as new array's index to count
    var a1 = s1.split('').map(function (c) {
        return (c.charCodeAt(0) | 0x20) - 97;
    }),
        a2 = s2.split('').map(function (c) {
        return (c.charCodeAt(0) | 0x20) - 97;
    });

    a1.forEach(function (c) {
        c1[c]++;
    });

    a2.forEach(function (c) {
        c2[c]++;
    });

    return c1.equals(c2);
};

// function to find longest word (did not finish the endpoint)
Solution.findLongestWord = function (arr) {
    var longestWord;
    longestWord = arr.reduce(function (longest, currentWord) {
        return currentWord.length > longest.length ? currentWord : longest;
    }, "");
    return longestWord;
};

// export Solution module
exports.Solution = Solution;