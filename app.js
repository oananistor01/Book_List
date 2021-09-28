const formElem = document.getElementById("form");
const firstContainerElement = document.getElementById("first-input");
const titleElem = document.getElementById("title");
const authorElem = document.getElementById("author");
const isbnElem = document.getElementById("isbn");
const tableElem = document.getElementById("my-table");

//class for creating book objects

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/*class UI - with methods for: 
- show confirmation message boxes (error, success, deleted book),
- add the book to the list, 
- delete a book,
- clearing the form */

class UI {
  showErrorBanner() {
    let errorMessageElem = document.createElement("p");
    errorMessageElem.classList.add("error");
    errorMessageElem.innerHTML = "Please fill in all fields!";
    formElem.insertBefore(errorMessageElem, firstContainerElement);

    setTimeout(() => {
      errorMessageElem.remove();
    }, 3000);
  }

  showIsbnErrorBanner() {
    let errorIsbnMessageElem = document.createElement("p");
    errorIsbnMessageElem.classList.add("error");
    errorIsbnMessageElem.innerHTML = "ISBN must contain only numbers!";
    formElem.insertBefore(errorIsbnMessageElem, firstContainerElement);

    setTimeout(() => {
      errorIsbnMessageElem.remove();
    }, 3000);
  }

  showSuccesBanner() {
    let successMessageElem = document.createElement("p");
    successMessageElem.classList.add("success");
    successMessageElem.innerHTML = "Book added!";
    formElem.insertBefore(successMessageElem, firstContainerElement);

    setTimeout(() => {
      successMessageElem.remove();
    }, 3000);
  }

  showBookDeletedBanner() {
    let deleteBookMessageElem = document.createElement("p");
    deleteBookMessageElem.classList.add("success");
    deleteBookMessageElem.innerHTML = "Book removed!";
    formElem.insertBefore(deleteBookMessageElem, firstContainerElement);
    console.log(titleElem.value);
    setTimeout(() => {
      deleteBookMessageElem.remove();
    }, 3000);
  }

  addBookToList(book) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="delete">x</a></td>
        `;

    tableElem.appendChild(row);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      this.showBookDeletedBanner();
    }
  }

  clearForm() {
    formElem.reset();
  }
}

//validating the input and creating a new book object with the input from the user
formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = new Book(titleElem.value, authorElem.value, isbnElem.value);
  const ui = new UI();

  if (titleElem.value == "" || authorElem.value == "" || isbnElem.value == "") {
    ui.showErrorBanner();
  } else if (isNaN(isbnElem.value)) {
    ui.showIsbnErrorBanner();
  } else {
    ui.addBookToList(book);
    ui.showSuccesBanner();
    ui.clearForm();
  }
});

//delete the row when clicking on X and show banner for deleted book, by calling a method inside another method in UI
tableElem.addEventListener("click", (e) => {
  const ui = new UI();

  ui.deleteBook(e.target);
  e.preventDefault();
});
