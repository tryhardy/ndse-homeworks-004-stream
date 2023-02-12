#!/usr/bin/env node

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const fs = require('fs');
const path = require('path');
const internal = require('stream');

let game = {

    data: {
        logFileExist: false,
        logName: 'log.json',
        logPath: '',
    },

    init: function() {
        this.data.logPath = path.join(__dirname, '', '', this.data.logName);
        this.play();
    },

    /**
     * Игра в орел и решка
     */
    play: function() {
        let self = this;
        let random = this.getRandom(1, 2);
        let data = {
            number: random,
            answer: '',
            win: false,
            date: new Date
        };

        rl.question(
            'Орел или решка? (1 или 2) ', 
            (answer) => {    
    
                let inputInt = Number.parseInt(answer);
                let randomInt = Number.parseInt(random);

                data.answer = answer;
    
                if (inputInt === randomInt) {
                    data.win = true;
                    console.log(`Правильно! Это - ${randomInt}`);
                }
                else if(isNaN(inputInt) || inputInt > 2 || inputInt < 1) {
                    console.log(`Нужно ввести ЧИСЛО в промежутке от 1 до 2 включительно`);
                }
                else {
                    console.log(`А вот и нет! Это - ${randomInt}`);
                }

                self.setLog(data);
                self.playAgain();
            }
        );
    },

    /**
     * Проверяет, хочет ли юзер повторить партию
     */
    playAgain: function() {
        let self = this;

        rl.question(
            'Сыграть еще разок? (Y/N) ', 
            (answer) => {

                if (answer == 'Y') {
                    self.play();
                }
                else if(answer == 'N') {
                    console.log('Пока-пока!');
                    rl.close();
                }
                else {
                    console.log('Форма введенного ответа неверный. Попробуйте еще раз.');
                    self.playAgain();
                }
            }
        );
    },

    /**
     * Возвращает случайное число в промежутке min-max включительно
     * @param min 
     * @param max 
     * @returns 
     */
    getRandom: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    setLog: function(data) {
        let stringData = JSON.stringify(data) + ',';
        fs.appendFile(this.data.logPath, stringData, (err) => {
            if (err) throw new Error(err)
        });
    },
};

game.init();