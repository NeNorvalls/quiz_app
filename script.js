document.addEventListener("DOMContentLoaded", function () {
  // Event listener to ensure DOM content is fully loaded before executing the script

  const startButton = document.getElementById("start-btn");
  // Get the start button element by its ID

  const nextButton = document.getElementById("next-btn");
  // Get the next button element by its ID

  const questionContainerElement =
    document.getElementById("question-container");
  // Get the question container element by its ID

  let questionElement = document.getElementById("question");
  // Get the question element by its ID and declare it as a variable

  const answerButtonsElement = document.getElementById("answer-buttons");
  // Get the answer buttons element by its ID

  let shuffledQuestions, currentQuestionIndex;
  // Declare variables to hold shuffled questions and current question index

  let quizScore = 0;
  // Initialize quiz score variable

  startButton.addEventListener("click", startGame);
  // Add event listener to the start button to call startGame function when clicked

  nextButton.addEventListener("click", () => {
    // Add event listener to the next button to increment current question index and call setNextQuestion function when clicked
    currentQuestionIndex++;
    setNextQuestion();
  });

  function startGame() {
    // Function to start the quiz game
    startButton.classList.add("hide");
    // Hide the start button
    nextButton.classList.remove("hide");

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // Shuffle the questions array randomly

    currentQuestionIndex = 0;
    // Reset current question index

    questionContainerElement.classList.remove("hide");
    // Show the question container

    setNextQuestion();
    // Call function to set the next question

    quizScore = 0;
    // Reset quiz score

    document.getElementById("right-answers").innerText = quizScore;
    // Update quiz score display
  }

  function setNextQuestion() {
    // Function to set the next question
    resetState();
    // Reset the state of the quiz

    if (currentQuestionIndex < shuffledQuestions.length) {
      // If there are more questions remaining
      showQuestion(shuffledQuestions[currentQuestionIndex]);
      // Show the next question
    } else {
      // If all questions have been answered
      startButton.innerText = "Restart";
      // Change start button text to "Restart"

      startButton.classList.remove("hide");
      // Show the start button
    }
  }

  function showQuestion(question) {
    // Function to display a question
    if (!questionElement) {
      // If question element doesn't exist
      questionElement = document.createElement("div");
      // Create a new question element

      questionElement.id = "question";
      // Set its ID

      document.body.appendChild(questionElement);
      // Append it to the document body
    }

    questionElement.innerText = question.question;
    // Set the question text

    question.answers.forEach((answer) => {
      // Loop through each answer option
      const button = document.createElement("button");
      // Create a new button element

      button.innerText = answer.text;
      // Set its text

      button.classList.add("btn");
      // Add the "btn" class

      if (answer.correct) {
        // If it is a correct answer
        button.dataset.correct = answer.correct;
        // Set the "correct" data attribute
      }

      button.addEventListener("click", selectAnswer);
      // Add click event listener to selectAnswer function

      answerButtonsElement.appendChild(button);
      // Append the button to the answer buttons container
    });
  }

  function resetState() {
    // Function to reset the state of the quiz
    clearStatusClass(document.body);
    // Clear status classes from the document body

    nextButton.classList.add("hide");
    // Hide the next button

    while (answerButtonsElement.firstChild) {
      // Loop through each answer button
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
      // Remove it from the answer buttons container
    }
  }

  function selectAnswer(e) {
    // Function to handle answer selection
    const selectedButton = e.target;
    // Get the clicked button

    const correct = selectedButton.dataset.correct;
    // Check if the selected answer is correct

    setStatusClass(document.body, correct);
    // Set status class for the document body

    Array.from(answerButtonsElement.children).forEach((button) => {
      // Loop through each answer button
      setStatusClass(button, button.dataset.correct);
      // Set status class for each button
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      startButton.innerText = "restart";
      startButton.classList.remove("hide");
    }
    if ((selectedButton.dataset = correct)) {
      quizScore++;
    }

    // if (correct === "true") {
    //   // If the selected answer is correct
    //   quizScore++;
    //   // Increment the quiz score
    // }

    document.getElementById("right-answers").innerText = quizScore;
    // Update quiz score display
  }

  function setStatusClass(element, correct) {
    // Function to set status class for an element
    clearStatusClass(element);
    // Clear existing status classes

    if (correct === "true") {
      // If the answer is correct
      element.classList.add("correct");
      // Add the "correct" class
    } else {
      // If the answer is wrong
      element.classList.add("wrong");
      // Add the "wrong" class
    }
  }

  function clearStatusClass(element) {
    // Function to clear status classes from an element
    element.classList.remove("correct");
    // Remove the "correct" class

    element.classList.remove("wrong");
    // Remove the "wrong" class
  }

  const questions = [
    {
      question: "What is the purpose of HTML?",
      answers: [
        { text: "To structure web pages", correct: true },
        { text: "To style web pages", correct: false },
        { text: "To add interactivity to web pages", correct: false },
        { text: "To define the behavior of web pages", correct: false },
      ],
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Sheets", correct: false },
        { text: "Cascading Sheet Styles", correct: false },
      ],
    },
    {
      question: "Which property is used to change the text color in CSS?",
      answers: [
        { text: "text-color", correct: false },
        { text: "font-color", correct: false },
        { text: "color", correct: true },
        { text: "text-style", correct: false },
      ],
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      answers: [
        { text: "<heading>", correct: false },
        { text: "<h6>", correct: false },
        { text: "<head>", correct: false },
        { text: "<h1>", correct: true },
      ],
    },
    {
      question: "What does the 'C' in CSS stand for?",
      answers: [
        { text: "Cascading", correct: true },
        { text: "Creative", correct: false },
        { text: "Content", correct: false },
        { text: "Computer", correct: false },
      ],
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      answers: [
        { text: "<lb>", correct: false },
        { text: "<br>", correct: true },
        { text: "<break>", correct: false },
        { text: "<newline>", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to control the spacing between elements?",
      answers: [
        { text: "spacing", correct: false },
        { text: "margin", correct: true },
        { text: "padding", correct: false },
        { text: "border", correct: false },
      ],
    },
    {
      question: "What does 'API' stand for?",
      answers: [
        { text: "Application Programming Interface", correct: true },
        { text: "Advanced Programming Instruction", correct: false },
        { text: "Automated Program Integration", correct: false },
        { text: "Application Protocol Interface", correct: false },
      ],
    },
    {
      question: "Which symbol is used to comment out lines in JavaScript?",
      answers: [
        { text: "//", correct: true },
        { text: "/* */", correct: false },
        { text: "#", correct: false },
        { text: "--", correct: false },
      ],
    },
    {
      question: "Which file type is used to contain JavaScript code?",
      answers: [
        { text: ".js", correct: true },
        { text: ".css", correct: false },
        { text: ".html", correct: false },
        { text: ".jpg", correct: false },
      ],
    },
    {
      question: "What does 'DOM' stand for in web development?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Data Object Model", correct: false },
        { text: "Dynamic Object Management", correct: false },
        { text: "Document Oriented Module", correct: false },
      ],
    },
    {
      question:
        "What is the purpose of the 'alt' attribute in HTML image tags?",
      answers: [
        { text: "To specify the alignment of the image", correct: false },
        { text: "To define the alternative text for the image", correct: true },
        { text: "To set the background color of the image", correct: false },
        { text: "To create a link when the image is clicked", correct: false },
      ],
    },
    {
      question: "Which CSS property is used to change the font size of text?",
      answers: [
        { text: "font-size", correct: true },
        { text: "text-size", correct: false },
        { text: "font-style", correct: false },
        { text: "text-font", correct: false },
      ],
    },
    {
      question: "What does 'HTTP' stand for in web development?",
      answers: [
        { text: "Hyperlink Text Transfer Protocol", correct: false },
        { text: "HyperText Transfer Package", correct: false },
        { text: "Hyperlink Text Transfer Package", correct: false },
        { text: "HyperText Transfer Protocol", correct: true },
      ],
    },
    {
      question: "Which HTML element is used to define navigation links?",
      answers: [
        { text: "<nav>", correct: true },
        { text: "<links>", correct: false },
        { text: "<navigation>", correct: false },
        { text: "<menu>", correct: false },
      ],
    },
    {
      question:
        "What is the correct way to comment out multiple lines in JavaScript?",
      answers: [
        { text: "// This is a comment", correct: false },
        { text: "/* This is a comment */", correct: true },
        { text: "# This is a comment", correct: false },
        { text: "-- This is a comment", correct: false },
      ],
    },
    {
      question:
        "Which property is used to control the size of an element's border?",
      answers: [
        { text: "border-width", correct: true },
        { text: "border-size", correct: false },
        { text: "border-style", correct: false },
        { text: "border-color", correct: false },
      ],
    },
    {
      question: "What does 'CSS' stand for in web development?",
      answers: [
        { text: "Cascading Style Solutions", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Creative Style Solutions", correct: false },
        { text: "Computer Style Sheets", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to change the background color of an element?",
      answers: [
        { text: "background-color", correct: true },
        { text: "color", correct: false },
        { text: "background", correct: false },
        { text: "background-image", correct: false },
      ],
    },
    {
      question: "What is the correct HTML element for creating a list?",
      answers: [
        { text: "<ul>", correct: false },
        { text: "<li>", correct: false },
        { text: "<list>", correct: false },
        { text: "<ol>", correct: true },
      ],
    },
    {
      question: "What does 'SEO' stand for in web development?",
      answers: [
        { text: "Search Engine Optimization", correct: true },
        { text: "Search Engine Operation", correct: false },
        { text: "Search Engine Organizer", correct: false },
        { text: "Search Engine Operator", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define an unordered list?",
      answers: [
        { text: "<ul>", correct: true },
        { text: "<ol>", correct: false },
        { text: "<li>", correct: false },
        { text: "<list>", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'rel' attribute in HTML link tags?",
      answers: [
        {
          text: "To specify the relationship between the current document and the linked document",
          correct: true,
        },
        { text: "To set the color of the link", correct: false },
        {
          text: "To define the location of the linked document",
          correct: false,
        },
        {
          text: "To create a relative path for the linked document",
          correct: false,
        },
      ],
    },
    {
      question: "Which CSS property is used to change the color of text?",
      answers: [
        { text: "text-color", correct: false },
        { text: "color", correct: true },
        { text: "font-color", correct: false },
        { text: "text-style", correct: false },
      ],
    },
    {
      question:
        "What is the correct way to include external JavaScript code in an HTML document?",
      answers: [
        { text: "<script src='script.js'></script>", correct: true },
        { text: "<script href='script.js'></script>", correct: false },
        { text: "<js src='script.js'></js>", correct: false },
        { text: "<include src='script.js'></include>", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define a table row?",
      answers: [
        { text: "<tr>", correct: true },
        { text: "<td>", correct: false },
        { text: "<table>", correct: false },
        { text: "<th>", correct: false },
      ],
    },
    {
      question: "What is the correct CSS syntax for referring to an ID?",
      answers: [
        { text: "#myElement", correct: true },
        { text: ".myElement", correct: false },
        { text: "myElement", correct: false },
        { text: "$myElement", correct: false },
      ],
    },
    {
      question: "What does 'WWW' stand for in web development?",
      answers: [
        { text: "World Wide Web", correct: true },
        { text: "World Web Wires", correct: false },
        { text: "Web Wide World", correct: false },
        { text: "Web World Wide", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define a hyperlink?",
      answers: [
        { text: "<a>", correct: true },
        { text: "<link>", correct: false },
        { text: "<h>", correct: false },
        { text: "<hyperlink>", correct: false },
      ],
    },
    {
      question: "What is the correct CSS syntax for referring to a class?",
      answers: [
        { text: ".myClass", correct: true },
        { text: "#myClass", correct: false },
        { text: "$myClass", correct: false },
        { text: "*myClass", correct: false },
      ],
    },
    {
      question: "What is React?",
      answers: [
        {
          text: "A JavaScript library for building user interfaces",
          correct: true,
        },
        { text: "A programming language", correct: false },
        { text: "A database management system", correct: false },
        { text: "A CSS framework", correct: false },
      ],
    },
    {
      question: "What is JSX?",
      answers: [
        { text: "A syntax extension for JavaScript", correct: true },
        { text: "A data structure in React", correct: false },
        { text: "A styling language for HTML", correct: false },
        { text: "A state management tool", correct: false },
      ],
    },
    {
      question: "What is the purpose of state in React?",
      answers: [
        {
          text: "To store and manage component data that may change over time",
          correct: true,
        },
        { text: "To define the structure of a component", correct: false },
        { text: "To manage the styling of a component", correct: false },
        { text: "To handle user input events", correct: false },
      ],
    },
    {
      question:
        "What lifecycle method is called after a component has been rendered to the DOM?",
      answers: [
        { text: "componentDidMount()", correct: true },
        { text: "componentWillUnmount()", correct: false },
        { text: "componentDidUpdate()", correct: false },
        { text: "componentWillUpdate()", correct: false },
      ],
    },
    {
      question: "What function is used to render a React component to the DOM?",
      answers: [
        { text: "ReactDOM.render()", correct: true },
        { text: "React.render()", correct: false },
        { text: "renderComponent()", correct: false },
        { text: "componentRender()", correct: false },
      ],
    },
    {
      question: "What is the purpose of props in React?",
      answers: [
        { text: "To pass data from parent to child components", correct: true },
        { text: "To manage component state", correct: false },
        { text: "To handle user events", correct: false },
        { text: "To define component structure", correct: false },
      ],
    },
    {
      question: "What is a key prop used for in React lists?",
      answers: [
        {
          text: "To uniquely identify elements in a list and optimize rendering performance",
          correct: true,
        },
        { text: "To apply styles to list items", correct: false },
        { text: "To filter items in a list", correct: false },
        { text: "To sort items in a list", correct: false },
      ],
    },
    {
      question: "What is the purpose of React.Fragment?",
      answers: [
        {
          text: "To group multiple React elements without adding extra nodes to the DOM",
          correct: true,
        },
        { text: "To create a new React component", correct: false },
        { text: "To define a reusable component template", correct: false },
        { text: "To manage component state", correct: false },
      ],
    },
    {
      question: "What tool can be used to bootstrap a new React project?",
      answers: [
        { text: "Create React App", correct: true },
        { text: "Reactify", correct: false },
        { text: "React Starter Kit", correct: false },
        { text: "React Boilerplate", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'key' prop in React?",
      answers: [
        {
          text: "To give React a hint which items can be reused, moved, or removed efficiently",
          correct: true,
        },
        { text: "To specify the order of elements in a list", correct: false },
        {
          text: "To uniquely identify elements for styling purposes",
          correct: false,
        },
        { text: "To define the structure of a component", correct: false },
      ],
    },
    {
      question: "What is the virtual DOM in React?",
      answers: [
        {
          text: "A lightweight copy of the actual DOM used for performance optimization",
          correct: true,
        },
        {
          text: "A component that simulates user interactions",
          correct: false,
        },
        { text: "A data structure used for state management", correct: false },
        { text: "A tool for debugging React applications", correct: false },
      ],
    },
    {
      question: "What are React Hooks?",
      answers: [
        {
          text: "Functions that let you use state and other React features without writing a class",
          correct: true,
        },
        {
          text: "Helper functions for handling HTTP requests in React",
          correct: false,
        },
        {
          text: "Event listeners for user interactions in React components",
          correct: false,
        },
        {
          text: "Built-in methods for optimizing performance in React applications",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of useEffect() hook in React?",
      answers: [
        {
          text: "To perform side effects in function components",
          correct: true,
        },
        { text: "To update component state", correct: false },
        { text: "To render JSX elements", correct: false },
        { text: "To handle user input events", correct: false },
      ],
    },
    {
      question: "What is JSX?",
      answers: [
        { text: "A syntax extension for JavaScript", correct: true },
        { text: "A templating language for React components", correct: false },
        {
          text: "A data structure used in React for state management",
          correct: false,
        },
        { text: "A styling language for HTML", correct: false },
      ],
    },
    {
      question: "What is a React component?",
      answers: [
        { text: "A reusable piece of UI", correct: true },
        { text: "A function that returns JSX", correct: false },
        {
          text: "A class that extends the React.Component class",
          correct: false,
        },
        { text: "An HTML element rendered by React", correct: false },
      ],
    },
    {
      question: "What are props drilling in React?",
      answers: [
        {
          text: "Passing props through multiple levels of nested components",
          correct: true,
        },
        { text: "Using props to update component state", correct: false },
        { text: "Creating new props dynamically", correct: false },
        {
          text: "Passing props from parent to child components only",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the useState() hook in React?",
      answers: [
        { text: "To add state to function components", correct: true },
        {
          text: "To create global state accessible to all components",
          correct: false,
        },
        { text: "To manage component lifecycle events", correct: false },
        {
          text: "To handle user authentication in React applications",
          correct: false,
        },
      ],
    },
    {
      question: "What is the significance of keys in React lists?",
      answers: [
        {
          text: "To identify which items have changed, are added, or are removed",
          correct: true,
        },
        { text: "To specify the order of elements in a list", correct: false },
        { text: "To apply unique styles to list items", correct: false },
        {
          text: "To filter items in a list based on a specific criteria",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the useContext() hook in React?",
      answers: [
        { text: "To access context values without nesting", correct: true },
        {
          text: "To create a new context for sharing values between components",
          correct: false,
        },
        {
          text: "To handle HTTP requests in React applications",
          correct: false,
        },
        {
          text: "To manage component state in function components",
          correct: false,
        },
      ],
    },
    {
      question: "What is React Router?",
      answers: [
        { text: "A library for routing in React applications", correct: true },
        { text: "A tool for optimizing React components", correct: false },
        {
          text: "A state management solution for React applications",
          correct: false,
        },
        { text: "A utility for testing React components", correct: false },
      ],
    },
    {
      question:
        "Explain the difference between localStorage and sessionStorage in HTML5.",
      answers: [
        {
          text: "localStorage stores data with no expiration date, while sessionStorage stores data for one session only.",
          correct: true,
        },
        {
          text: "localStorage encrypts data before storing it, while sessionStorage does not.",
          correct: false,
        },
        {
          text: "localStorage stores data only on the server, while sessionStorage stores data locally.",
          correct: false,
        },
        {
          text: "localStorage can only store strings, while sessionStorage can store any data type.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are some common performance optimization techniques in web development?",
      answers: [
        { text: "Minifying CSS and JavaScript files", correct: true },
        {
          text: "Using a content delivery network (CDN) to serve static assets",
          correct: true,
        },
        {
          text: "Implementing lazy loading for images and other resources",
          correct: true,
        },
        { text: "Using inline styles for faster rendering", correct: false },
      ],
    },
    {
      question: "What is the purpose of a CSS preprocessor like Sass or Less?",
      answers: [
        {
          text: "To extend the functionality of CSS with features like variables, mixins, and nesting",
          correct: true,
        },
        {
          text: "To optimize CSS files for faster loading times",
          correct: false,
        },
        { text: "To convert CSS code into HTML code", correct: false },
        { text: "To create animations and transitions in CSS", correct: false },
      ],
    },
    {
      question: "Explain the concept of responsive web design.",
      answers: [
        {
          text: "Designing web pages that adapt to different screen sizes and devices",
          correct: true,
        },
        {
          text: "Creating web pages with fixed dimensions for a consistent layout",
          correct: false,
        },
        {
          text: "Using JavaScript to dynamically change the layout of a web page",
          correct: false,
        },
        {
          text: "Optimizing web pages for search engines (SEO)",
          correct: false,
        },
      ],
    },
    {
      question: "What is a RESTful API?",
      answers: [
        {
          text: "An architectural style for designing networked applications",
          correct: true,
        },
        {
          text: "A JavaScript library for building user interfaces",
          correct: false,
        },
        {
          text: "A database management system for storing and retrieving data",
          correct: false,
        },
        {
          text: "A programming language for server-side development",
          correct: false,
        },
      ],
    },
    {
      question:
        "How does React handle data flow in a component-based architecture?",
      answers: [
        {
          text: "Through unidirectional data flow, where data flows from parent to child components",
          correct: true,
        },
        {
          text: "Through bidirectional data binding, where changes in the model are automatically reflected in the view",
          correct: false,
        },
        {
          text: "Through the use of global state accessible to all components",
          correct: false,
        },
        {
          text: "Through event delegation, where events are handled by a common ancestor component",
          correct: false,
        },
      ],
    },
    {
      question: "Explain the concept of 'props' in React.",
      answers: [
        {
          text: "Props (short for properties) are read-only inputs to a React component that are passed from its parent component.",
          correct: true,
        },
        {
          text: "Props are used to update component state in React.",
          correct: false,
        },
        {
          text: "Props are reserved keywords in React used for conditional rendering.",
          correct: false,
        },
        {
          text: "Props are used to define the structure of a React component's HTML markup.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are some advantages of using a front-end framework like Angular or Vue.js?",
      answers: [
        {
          text: "Provides a structured and organized way to build complex web applications",
          correct: true,
        },
        {
          text: "Offers built-in support for routing, state management, and form validation",
          correct: true,
        },
        {
          text: "Reduces the amount of boilerplate code and repetitive tasks",
          correct: true,
        },
        {
          text: "Requires less memory and processing power compared to vanilla JavaScript",
          correct: false,
        },
      ],
    },
    {
      question: "Explain the concept of 'state' in React.",
      answers: [
        {
          text: "State represents the data that a component needs to render and respond to user actions.",
          correct: true,
        },
        {
          text: "State is a built-in JavaScript object used for storing data in key-value pairs.",
          correct: false,
        },
        {
          text: "State is immutable and cannot be changed once it is set.",
          correct: false,
        },
        {
          text: "State is passed from parent to child components via props.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What is the role of a package manager like npm or Yarn in front-end development?",
      answers: [
        {
          text: "To manage dependencies and libraries used in a project",
          correct: true,
        },
        {
          text: "To optimize and compress static assets for faster loading times",
          correct: false,
        },
        {
          text: "To deploy web applications to production servers",
          correct: false,
        },
        {
          text: "To automate the testing and quality assurance process",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are the key differences between Flexbox and CSS Grid layout?",
      answers: [
        {
          text: "Flexbox is primarily for one-dimensional layouts (row or column), while CSS Grid is for two-dimensional layouts (rows and columns).",
          correct: true,
        },
        {
          text: "Flexbox is more suitable for grid-like layouts, while CSS Grid is better for flexible content arrangements.",
          correct: true,
        },
        {
          text: "Flexbox offers more control over item alignment and order compared to CSS Grid.",
          correct: false,
        },
        {
          text: "CSS Grid is not supported in older browsers, while Flexbox has better cross-browser compatibility.",
          correct: false,
        },
      ],
    },
    {
      question: "Explain the 'box model' in CSS.",
      answers: [
        {
          text: "The box model refers to how elements are structured in CSS, consisting of content, padding, border, and margin.",
          correct: true,
        },
        {
          text: "The box model defines the positioning of elements on a web page using a grid-based layout system.",
          correct: false,
        },
        {
          text: "The box model is a design pattern for creating responsive web layouts using media queries.",
          correct: false,
        },
        {
          text: "The box model determines the color and typography of text elements on a web page.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are some ways to optimize website performance for mobile devices?",
      answers: [
        {
          text: "Using responsive design techniques to ensure content adapts to various screen sizes.",
          correct: true,
        },
        {
          text: "Optimizing images and multimedia content for faster loading times on mobile networks.",
          correct: true,
        },
        {
          text: "Minifying CSS, JavaScript, and HTML files to reduce file sizes and improve loading speed.",
          correct: true,
        },
        {
          text: "Implementing touch-friendly navigation and user interface elements.",
          correct: true,
        },
      ],
    },
    {
      question: "What is the purpose of the 'viewport' meta tag in HTML?",
      answers: [
        {
          text: "The viewport meta tag controls the layout and scaling of a web page on mobile browsers.",
          correct: true,
        },
        {
          text: "The viewport meta tag specifies the character encoding used in the HTML document.",
          correct: false,
        },
        {
          text: "The viewport meta tag defines the language and locale of the web page content.",
          correct: false,
        },
        {
          text: "The viewport meta tag sets the default font size and color for text elements on a web page.",
          correct: false,
        },
      ],
    },
    {
      question:
        "Explain the concept of 'event bubbling' and 'event capturing' in JavaScript.",
      answers: [
        {
          text: "Event bubbling refers to the propagation of an event from the target element to its ancestors, while event capturing is the opposite.",
          correct: true,
        },
        {
          text: "Event bubbling and event capturing both describe the process of triggering multiple events simultaneously.",
          correct: false,
        },
        {
          text: "Event bubbling occurs when an event is triggered multiple times on the same element, while event capturing happens only once.",
          correct: false,
        },
        {
          text: "Event bubbling and event capturing are terms used interchangeably to describe event handling in JavaScript.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are some methods for optimizing SEO (Search Engine Optimization) for a website?",
      answers: [
        {
          text: "Using descriptive and keyword-rich meta tags in HTML.",
          correct: true,
        },
        {
          text: "Creating high-quality, relevant content that engages users.",
          correct: true,
        },
        {
          text: "Optimizing website performance and speed to improve user experience.",
          correct: true,
        },
        {
          text: "Building backlinks from reputable websites to increase domain authority.",
          correct: true,
        },
      ],
    },
    {
      question:
        "Explain the concept of 'asynchronous programming' in JavaScript.",
      answers: [
        {
          text: "Asynchronous programming allows multiple tasks to be executed concurrently, without blocking the main thread.",
          correct: true,
        },
        {
          text: "Asynchronous programming ensures that code execution occurs in a sequential order, one statement at a time.",
          correct: false,
        },
        {
          text: "Asynchronous programming is used to synchronize data between the client and server in real-time.",
          correct: false,
        },
        {
          text: "Asynchronous programming involves executing tasks in parallel using multiple CPU cores.",
          correct: false,
        },
      ],
    },
    {
      question:
        "What are some benefits of using a task runner like Grunt or Gulp in front-end development?",
      answers: [
        {
          text: "Task runners automate repetitive tasks such as minification, compilation, and unit testing, saving time and effort.",
          correct: true,
        },
        {
          text: "Task runners improve code quality by enforcing coding standards and performing code linting and validation.",
          correct: true,
        },
        {
          text: "Task runners facilitate collaboration among team members by providing a unified build process and workflow.",
          correct: true,
        },
        {
          text: "Task runners optimize website performance by automatically compressing and optimizing assets for production.",
          correct: true,
        },
      ],
    },
    {
      question: "What is the purpose of using 'polyfills' in web development?",
      answers: [
        {
          text: "Polyfills are used to provide modern JavaScript features and APIs to older browsers that do not support them natively.",
          correct: true,
        },
        {
          text: "Polyfills are used to optimize website performance by reducing the number of HTTP requests.",
          correct: false,
        },
        {
          text: "Polyfills are used to enhance the user experience by adding visual effects and animations to web pages.",
          correct: false,
        },
        {
          text: "Polyfills are used to secure web applications by preventing common security vulnerabilities.",
          correct: false,
        },
      ],
    },
    {
      question:
        "Explain the concept of 'Progressive Web Apps' (PWAs) and their benefits.",
      answers: [
        {
          text: "Progressive Web Apps are web applications that provide a native app-like experience to users, including offline capabilities, push notifications, and home screen installation.",
          correct: true,
        },
        {
          text: "Progressive Web Apps are web applications that require users to install additional software or plugins to access their full functionality.",
          correct: false,
        },
        {
          text: "Progressive Web Apps are web applications that are only accessible on mobile devices and cannot be accessed on desktop computers.",
          correct: false,
        },
        {
          text: "Progressive Web Apps are web applications that are optimized for older browsers and devices with limited hardware capabilities.",
          correct: false,
        },
      ],
    },
  ];
});
