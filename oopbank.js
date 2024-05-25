#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Bank {
    balance;
    constructor(ini_balance) {
        this.balance = ini_balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(chalk.green(`${amount} amount is deposited in your bamk account!`));
        this.show_Balance();
    }
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(chalk.blue(`${amount} amount is withdraw from your account`));
            this.show_Balance();
        }
        else {
            console.log(chalk.yellow("insufficiant balance"));
        }
    }
    show_Balance() {
        console.log(chalk.cyan(`your current balance is ${this.balance}`));
    }
}
async function oopbank(account) {
    const s = await inquirer.prompt([{
            type: "list",
            name: "select",
            message: chalk.magenta.bold("what do you want to do?"),
            choices: [chalk.blue.italic.bold("DEPOSIT"),
                chalk.green.italic.bold("WITHDRAW"),
                chalk.yellow.italic.bold("CHECK BALANCE"),
                chalk.cyan.italic.bold("EXIT")],
        }]);
    switch (s.select) {
        case chalk.blue.italic.bold("DEPOSIT"):
            const d = await inquirer.prompt([{
                    type: "number",
                    name: "dep",
                    message: chalk.magenta.bold("Enter Amount You Want To Deposit : "),
                }]);
            account.deposit(d.dep);
            break;
        case chalk.green.italic.bold("WITHDRAW"):
            const w = await inquirer.prompt([{
                    type: "number",
                    name: "with",
                    message: chalk.magenta.bold("Enter Amount You Want To Withdraw : "),
                }]);
            account.withdraw(w.with);
            break;
        case chalk.yellow.italic.bold("CHECK BALANCE"):
            account.show_Balance();
            break;
        case chalk.cyan.italic.bold("EXIT"):
            console.log(chalk.bgHex('#DEADED')(" !!THANK YOU FOR BANKING IN THIS APP !!"));
            return;
    }
    oopbank(account);
}
const account = new Bank(0);
oopbank(account);
