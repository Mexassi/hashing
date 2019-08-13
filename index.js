#!/usr/bin/env node
(() => {
    'use strict';

    const md5 = require('md5');
    const inquirer = require('inquirer');
    const chalk = require('chalk');

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Please enter the text to hash:'
            }
        ])
        .then(answers => {
            const text = answers.text;

            console.log(`the text to hash is ${chalk.cyan(text)}`);
        });

})();