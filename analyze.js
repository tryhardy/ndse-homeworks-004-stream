#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const internal = require('stream');

let analyze = {
    data: {
        analyzeName: 'analyze.json',
        analyzePath: '',

        logName: 'log.json',
        logPath: '',
    },

    init: function() {
        this.data.logPath = path.join(__dirname, '', '', this.data.logName);
        this.data.analyzePath = path.join(__dirname, '', '', this.data.analyzeName);

        let logReader = fs.createReadStream(this.data.logPath);
        let analyzeWriter = fs.createWriteStream(this.data.analyzePath);

        let analyzeStr = '';
        let analyze = {
            count: 0,
            win: 0,
            lose: 0,
            procent: 0
        };

        logReader.setEncoding('UTF8');
        logReader.on('data', function (chunk) {
            let array = chunk.split(';');
            let result = [];

            for(let i = 0; i < array.length; i++) {
                if(array[i]) {
                    result[i] = JSON.parse(array[i]);
                }
            }

            for(let i = 0; i < result.length; i++) {
                if(result[i].win) {
                    analyze.win++;
                }
                else {
                    analyze.lose++;
                }
            }

            analyze.count = result.length;
            analyzeStr = JSON.stringify(analyze);

            analyzeWriter.write(analyzeStr, (err) => {
                if(err) throw new Error(err);
                console.log('Игры проанализированы');
            })
        });
    }
};

analyze.init();