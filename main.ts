
import inquirer from "inquirer";

class Book {
    title: string;
    available: boolean;

    constructor(title: string) {
        this.title = title;
        this.available = true;
    }

    toggleAvailability() {
        this.available = !this.available;
    }
}

class Library {
    books: Book[];

    constructor() {
        this.books = [];
    }

    addBook(book: Book) {
        this.books.push(book);
    }

    issueBook(title: string) {
        const book = this.books.find(book => book.title === title && book.available);

        if (book) {
            book.toggleAvailability();
            console.log(`Book "${book.title}" has been issued.`);
        } else {
            console.log("Book is either unavailable or not found.");
        }
    }

    returnBook(title: string) {
        const book = this.books.find(book => book.title === title && !book.available);

        if (book) {
            book.toggleAvailability();
            console.log(`Book "${book.title}" has been returned.`);
        } else {
            console.log("Book is either already available or not found.");
        }
    }
}

const library = new Library();

// Add some initial books to the library
library.addBook(new Book("Harry Potter"));
library.addBook(new Book("The Lord of the Rings"));
library.addBook(new Book("The Great Gatsby"));

const manageLibrary = async (library: Library) => {
    console.log("Welcome to the Library Management System");

    const options = await inquirer.prompt({
        type: "list",
        message: "Choose an action:",
        name: "action",
        choices: ["Issue a Book", "Return a Book", "Exit"],
    });

    if (options.action === "Issue a Book") {
        const booksList = library.books.map(book => book.title);
        const issueBook = await inquirer.prompt({
            type: "list",
            message: "Select a book to issue:",
            name: "book",
            choices: booksList,
        });

        library.issueBook(issueBook.book);
    } else if (options.action === "Return a Book") {
        const issuedBooks = library.books.filter(book => !book.available).map(book => book.title);
        const returnBook = await inquirer.prompt({
            type: "list",
            message: "Select a book to return:",
            name: "book",
            choices: issuedBooks,
        });

        library.returnBook(returnBook.book);
    } else if (options.action === "Exit") {
        console.log("Thank you for using the Library Management System.");
        return;
    }

    // Recursively call the function for further actions
    manageLibrary(library);
};

manageLibrary(library);
