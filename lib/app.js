
/******** module to provide endpoints to work with Anagrams. ********/

const fs = require('fs');

const express = require('express');
const wordListPath = require('word-list');
const Solution = require('./Solution').Solution;

const app = express();
const wordList = fs.readFileSync(wordListPath, 'utf8').split('\n');

/**
 * @api {get} /find Find Anagrams
 * @apiDescription This endpoint will find all anagrams in the english dictionary based on the string sent
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/find?word=test*/
app.get('/find', (req, res) => {
    try {
        let word = req.query.word.toLowerCase();
        let list = [];
        wordList.forEach(element => {
            if (Solution.anagram(word, element) === true && word !== element) {
                list.push(element);
            }
        });
        res.send(list);
    } catch (err) {
        throw 'Please use the correct api param.';
    }
});

/**
 * @api {get} /compare Compare Anagrams
 * @apiName CompareAnagrams
 * @apiDescription This endpoint will receive two words, and compare them to see if they are anagrams
  * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/compare?word1=test&word2=tset*/
app.get('/compare', (req, res) => {
    try {
        let word1 = req.query.word1.toLowerCase();
        let word2 = req.query.word2.toLowerCase();
        let ifAnagram = Solution.anagram(word1, word2) === true && word1 !== word2;
        res.send(ifAnagram);
    } catch (err) {
        throw 'Please use the correct api param.';
    }
});

app.listen(3001, () => console.log('App listening on port 3001'));

/*
****************************************************************************************

 ******* @apiSuccessExample {json} Success-Response: *******

 ***** @api {get} /find Find Anagrams *****
 * http://localhost:3001/find?word=mary
 * [
 * "army"
 * ]
 *
 * http://localhost:3001/find?word=silent
 * [
 * "elints",
 * "enlist",
 * "inlets",
 * "intels",
 * "listen",
 * "tinsel"
 * ]


 ***** @api {get} /compare Compare Anagrams *****
 * http://localhost:3001/compare?word1=mary&word2=army
 * true
 *
 *
 *http://localhost:3001/compare?word1=mary&word2=marry
 * false

*/