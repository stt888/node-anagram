
/********* unit test *********/

const assert = require('assert');
const fs = require('fs');
const wordListPath = require('word-list');
const Solution = require('../lib/Solution').Solution;
const wordList = fs.readFileSync(wordListPath, 'utf8').split('\n');



// ********** test finding an anagram from word-list **********/
let find = word => {
    // let word = 'silent'
    let list = [];
    wordList.forEach(element => {
        if (Solution.anagram(word, element) === true && word !== element) {
            list.push(element);
        }
    });
    return list;
};

// when pass param as 'mary', it should return 'army'
it("should return army", function () {
    let response = find('mary');
    assert.equal(response, 'army');
});

// when pass param as number 2, the test failed because any two empty array cannot be equal
it("should return []", function () {
    let response = find('2');
    assert.equal(response, []);
});

// ********** test comparing two words if they're anagram from **********/
const compare = (word1, word2) => {
    let ifAnagram = Solution.anagram(word1, word2) === true && word1 !== word2;
    return ifAnagram;
};

// when pass param as 'mary' and 'army', it should be true
it("should return true", function () {
    let response = compare('mary', 'army');
    assert.equal(response, true);
});

// when pass param as 'mary' and number 2, it should be false
it("should return false", function () {
    let response = compare('mary', '2');
    assert.equal(response, false);
});