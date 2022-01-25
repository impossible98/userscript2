const childProcess = require('child_process');
const process = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Commit {
    constructor() {
        this.type = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'];
    }

    question(query) {
        return new Promise(function(resolve) {
            return rl.question(query, function(answer) {
                return resolve(answer);
            });
        });
    }

    async exec() {
        childProcess.exec('git add --all');
        let answer;
        let answer2;
        let answer3;
        let answer4;

        for (; true;) {
            answer = await this.question(`Please input your commit type (${this.type}): `);
            if (this.type.indexOf(answer) !== -1) {
                break;
            }
        }

        answer2 = await this.question('Please input your commit scope: ');
        if (answer2 !== '') {
            answer2 = '(' + answer2 + ')';
        }

        for (; true;) {
            answer3 = await this.question('Please input your commit message: ');
            if (answer3.trim().length !== 0) {
                break;
            }
        }

        console.log(`${answer}${answer2}: ${answer3.trim()}`);

        answer4 = await this.question('Are you sure to git commit? (y/N) ');

        if (answer4.toLowerCase() === 'y') {
            childProcess.exec(`git commit -m "${answer}${answer2}: ${answer3.trim()}"`);
        }

        rl.close();
    }
}

const commit = new Commit();

function main() {
    commit.exec();
}

main();
