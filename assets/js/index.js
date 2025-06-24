'use strict';

// 1. Задача: проектуємо бібліотеку. 

// Написати клас для об’єкта Книга (Book) з такими властивостями:
// автор
// назва
// рік написання
// кількість сторінок
// номер полиці
// id юзера який взяв книгу

// Книга може розташовуватись на полиці або бути виданою на руки користувача. Відповідно, 
// потрібно додати дві властивості - номер полиці та id юзера. Якщо книгу хтось читає - у властивості 
// “номер полиці” має бути null, а id юзера має відповідати тому юзеру, який її читає. 
// Якщо ж книга вакантна і її можна арендувати (взяти почитати), то вона має ціле число у властивості 
// “номер полиці” і null в графі id юзера.

// Передбачити два методи екземпляра книги: 
// метод isVacant(), який повертає true, якщо книга стоїть на полиці і її можна взяти
// метод getRent(id), який приймає id юзера і “видає” книгу на руки - встановлює номер полиці в null 
// і id юзера рівним тому, що переданий в аргументи методу

// Додатково написати клас для створення об’єктів юзера. Юзер має наступні властивості:
// id
// ім’я
// прізвище
// адреса проживання


/**
 * Клас, що представляє книгу в бібліотеці.
 */
class Book {
    /**
     * @property {string} author - Автор книги.
     * @property {string} name - Назва книги.
     * @property {number} year - Рік випуску книги.
     * @property {number} volume - Кількість сторінок.
     * @property {number|null} shelf - Номер полиці, де книга зберігається. Null, якщо книга орендована.
     * @property {number|null} userId - ID користувача, який орендував книгу. Null, якщо книга вільна.
     */


    /**
     * Створює екземпляр книги.
     * @param {string} bookAuthor - Автор книги.
     * @param {string} bookName - Назва книги.
     * @param {number} releaseYear - Рік випуску книги.
     * @param {number} pageQuantity - Кількість сторінок.
     * @param {number|null} shelfNum - Початковий номер полиці книги. Null, якщо книга не на полиці (наприклад, орендована).
     * @param {number|null} user - Початковий ID користувача, який орендував книгу. Null, якщо книга вільна.
     */

    constructor(bookAuthor, bookName, releaseYear, pageQuantity, shelfNum, user) {
    /**
     * Перевіряє, винятковий випадок чи книга не знаходиться одночасно в двох станах. 
     * (shelf === null && user === null || shelf === number && user === number)
     * Книга вважається вільною в двох станах, якщо вона знаходиться на полиці(shelf не null)
     * і хтось її орендував (userId не null). Та навпаки.
     * Викидає помилку з зупинкою коду ще до створення екземпляру
     */
        if (!!shelfNum === !!user) {
            throw new Error('Invalid shelf and user combination');
        }
        
        this.author = bookAuthor;
        this.name = bookName;
        this.year = releaseYear;
        this.volume = pageQuantity;
        this.shelf = shelfNum;
        this.userId = user;
    }

    /**
     * Перевіряє, чи книга доступна для оренди.
     * Книга вважається вільною, якщо вона знаходиться на полиці (shelf не null)
     * і ніхто її не орендував (userId є null).
     * @returns {boolean} True, якщо книга вільна; false в іншому випадку.
     */
    isVacant(){
        return this.shelf !== null && this.userId === null;
    }

    /**
     * Дозволяє орендувати книгу, якщо вона доступна.
     * Якщо книга успішно орендована, її shelf стає null, а userId встановлюється на ID орендаря.
     * @param {number} user - ID користувача, який орендує книгу.
     * @returns {boolean} True, якщо книга успішно орендована; false, якщо книга недоступна.
     */
    getRent(user) {  
        if (this.isVacant()) {
            this.shelf = null;
            this.userId = user;
            return true;
        }
        return false;
    }

    /**
     * Дозволяє повернути книгу на полицю.
     * Якщо книга була орендована, її userId стає null, а shelf встановлюється на вказаний номер полиці.
     * @param {number} shelfNum - Номер полиці, на яку повертається книга.
     * @returns {boolean} True, якщо книга успішно повернута; false, якщо книга не була орендована.
     */
    returnBook(shelfNum) { 
        if (this.userId !== null) {
            this.userId = null;
            this.shelf = shelfNum;
            return true;
        }
        return false;
    }
}


/**
 * Клас, що представляє користувача бібліотеки.
 */
class User {

    /**
     * @property {number} id - Унікальний ID користувача.
     * @property {string} firstName - Ім'я користувача.
     * @property {string} lastName - Прізвище користувача.
     * @property {string} addr - Адреса користувача.
     */

    /**
     * Створює екземпляр користувача.
     * @param {number} user - Унікальний ID користувача.
     * @param {string} name - Ім'я користувача.
     * @param {string} surname - Прізвище користувача.
     * @param {string} address - Адреса користувача.
     */
    constructor(user, name, surname, address) {
        this.id = user;
        this.firstName = name;
        this.lastName = surname;
        this.addr = address;
    }
}

const user1 = new User (123, 'Taras', 'Murkin', 'jnkmdl str. 45');
const user2 = new User (223, 'Valera', 'Siomkin', 'jnkmdl str. 55');
const user3 = new User (323, 'Anna', 'Mushka', 'jnkmdl str. 35');
// console.log(user1);
// console.log(user2);
// console.log(user3);


const book1 = new Book ('J.K.Rowling', 'Harry Potter and the Sotcerer`s stone', 1997, 223, 5, null);
const book2 = new Book ('J.K.Rowling', 'Harry Potter and the Chamber of secrets', 1998, 251, null, user2.id);
// const book3 = new Book ('J.K.Rowling', 'Harry Potter and the Sotcerer`s stone', 1999, 317, 4, user3.id);
// console.log(book1);
// console.log(book2);
// console.log(book3);

// console.log(book1.isVacant());  // true
// console.log(book1.getRent());  // true
// console.log(book1.returnBook(2));  // true
// console.log(book1.shelf);  // 2
// console.log(book1.userId);  // null


// console.log(book2.isVacant());  // false
// // console.log(book2.getRent());  // false
// console.log(book2.returnBook(5));  // true
// console.log(book2.shelf);  // 5 
// console.log(book2.userId);  // null

// console.log(book3.isVacant());  // false
// console.log(book3.getRent(user2.id));  // false
// console.log(book3.userId); // 323
// console.log(book3.shelf);  // 4 
// console.log(book3.returnBook(4));  // true
// console.log(book3.shelf);  // 4 
// console.log(book3.userId);  // null







// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 2. Створити клас для опису абстрактної тварини і два класи для тварин Тигр та Вовк, які його розширюють. 
// Батьківський клас має реалізувати методи hunting та growl (робота методів - вивести в консоль рядок типу “зараз дожену здобич” та “грррррр”),
//  а тигр та вовк мають реалізувати однойменні методи по-своєму (наприклад, виводити “тигр з’їсть тебе”). 
// Створити декілька екземплярів класу Тигр і Вовк і перевірити, чий метод викликається - класу-дитини або абстрактного батьківського класу


/**
 * Базовий клас, що представляє загальну тварину.
 */
class Animal {
    /**
     * @property {string} name - Ім'я тварини.
     * @property {number} age - Вік тварини в роках.
     * @property {number} weight - Вага тварини в кг.
     * @property {string} color - Колір тварини.
     */

    /**
     * Створює екземпляр тварини.
     * @param {string} name - Ім'я тварини.
     * @param {number} age - Вік тварини.
     * @param {number} weight - Вага тварини.
     * @param {string} color - Колір тварини.
     */
    constructor (name, age, weight, color) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.color = color;
    }

    /**
     * Виводить повідомлення про те, що тварина полює.
     * Не приймає параметрів.
     * Це загальний метод, який може бути перевизначений у похідних класах.
     */
    hunting() {
        console.log(`I'll kill you prey!`);
    }

    /**
     * Виводить загальний звук гарчання тварини.
     * Не приймає параметрів.
     * Це загальний метод, який може бути перевизначений у похідних класах.
     */
    growl() {
        console.log('roar!');
    }
}


/**
 * Клас, що представляє Тигра. Успадковує від класу Animal.
 */
class Tiger extends Animal {

    /**
     * @property {string} voice - Звук, який видає тигр (зазвичай 'roar').
     * @property {string} print - Тип забарвлення тигра (зазвичай 'striped').
     */

    /**
     * Створює екземпляр Тигра.
     * @param {string} name - Ім'я тигра.
     * @param {number} age - Вік тигра.
     * @param {number} weight - Вага тигра.
     * @param {string} color - Колір тигра.
     */
    constructor (name, age, weight, color) {
        super(name, age, weight, color);
        this.voice = 'roar';
        this.print = 'striped';
        
    }

    /**
     * Виводить повідомлення про те, що тигр полює, використовуючи його ім'я.
     * Перевизначає метод hunting з батьківського класу.
     */
    hunting() {
        console.log(`${this.name} will kill you prey!`);
    }

    /**
     * Виводить специфічний звук гарчання тигра.
     * Перевизначає метод growl з батьківського класу.
     */
    growl() {
        console.log('Roooooaaaarrrrrrr!');
    }
}


/**
 * Клас, що представляє Вовка. Успадковує від класу Animal.
 */
class Wolf extends Animal {
    /**
     * @property {string} voice - Звук, який видає вовк (зазвичай 'howl').
     */

    /**
     * Створює екземпляр Вовка.
     * @param {string} name - Ім'я вовка.
     * @param {number} age - Вік вовка.
     * @param {number} weight - Вага вовка.
     * @param {string} color - Колір вовка.
     */
    constructor(name, age, weight, color) {
        super(name, age, weight, color);
        this.voice = 'howl';
    }

    /**
     * Виводить повідомлення про те, що вовк збирається знайти здобич, використовуючи його ім'я.
     * Перевизначає метод hunting з батьківського класу.
     */
    hunting() {
        console.log(`${this.name} is going to find you prey!`);
    }

    /**
     * Виводить специфічний звук виття вовка.
     * Перевизначає метод growl з батьківського класу.
     */
    growl() {
        console.log('Howwwllllll!');
    }
}


const tiger1 = new Tiger('Tiger', 5, 120, 'reddish');
const tiger2 = new Tiger('Tiger', 10, 140, 'white');
const tiger3 = new Tiger('Tiger', 7, 130, 'reddish');

console.log(tiger1);
console.log(tiger2);
console.log(tiger3);

console.log(tiger1.hunting());  // Tiger will kill you prey!
console.log(tiger3.growl());  //Roooooaaaarrrrrrr!
console.log(tiger1.name); // Tiger

const wolf1 = new Wolf('Wolf', 2, 35, 'grey');
const wolf2 = new Wolf('Wolf', 12, 55, 'white');
const wolf3 = new Wolf('Wolf', 6, 70, 'grey');


console.log(wolf1);
console.log(wolf2);
console.log(wolf3);

console.log(wolf1.hunting());  // Wolf is going to find you prey!
console.log(wolf1.growl());  // Howwwllllll!


const animal = new Animal ('puppy', 1, 2, 'brown');
console.log(animal);