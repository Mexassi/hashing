#!/usr/bin/env node
(() => {
    'use strict';

    const md5 = require('md5');
    const inquirer = require('inquirer');
    const chalk = require('chalk');
    const hash = require('hash.js');
    const murmurhash = require('murmurhash');
    const RIPEMD160 = require('ripemd160');

    const Algos = {
        MD5: 'md5',
        SHA1: 'sha1',
        SHA224: 'sha224',
        SHA256: 'sha256',
        SHA512: 'sha512',
        MURMUR: 'murmur',
        RIPEMD160: 'ripemd160'
    };

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'algo',
                message: 'Which hashing algorithm do you want to use?',
                choices: [Algos.MD5, Algos.SHA1, Algos.SHA224, Algos.SHA256, Algos.SHA512, Algos.MURMUR, Algos.RIPEMD160]
            }
        ])
        .then(answers => {
            const algo = answers.algo;

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
                    
                    let hashed = null;

                    switch (algo) {
                        case Algos.MD5:
                            hashed = md5(text);
                            break;
                        case Algos.SHA1:
                        case Algos.SHA224:
                        case Algos.SHA256:
                        case Algos.SHA512:
                            hashed = hash[algo]().update(text).digest('hex');

                            break;
                        case Algos.MURMUR:
                            hashed = murmurhash.v3(text);
                            break;    
                        case Algos.RIPEMD160:
                            hashed = new RIPEMD160().update(text).digest('hex')
                            break;    
                        default:
                            throw new Error(`${algo} not supported`);
                    }
                
                    console.log(`your ${algo} hash is: ${chalk.cyan(hashed)}`);
                });
        });

})();