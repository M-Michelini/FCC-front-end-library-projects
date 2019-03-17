This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### Features
- Use [marked.js](https://cdnjs.com/libraries/marked) to convert text to markdown.
- Switch between editing and previewing markdown using a Tab component.

### Possible updates
This is a pretty small app, so there isn't a whole heap that can be added.
but here's a few ideas I may come back to when I have nothing better to do.

- Make links in the preview open in a new tab.
- Add some shortcuts in the editor to build common markdown structures.
- Add some more css media queeries to make more responsive.

### User stories (Original)
The following project is from the curriculum of [https://www.freecodecamp.org/]
- User Story #1: I can see a textarea element with a corresponding id="editor".
- User Story #2: I can see an element with a corresponding id="preview".
- User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.
- User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type (HINT: You don't need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked).
- User Story #5: When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.
- User Story #6: When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element.

### User stories (Updated)
Some of the user stories got in the way of making my own updates, so here is my
own set of updated user stories that I've edited.
- User Story #1: I can see an element with a corresponding id="tab-container".
- User Story #2: The first element in "tab-container" is an element with className="tabs-row".
- User Story #3: There is 2 elements with className="tab" in "tabs-row" labeled "editor" and "preview".
- User Story #4: I can click each tab to switch to that tabs corresponding component, the component should have an id matching the tabs label. this click also appends "tab-active" to the tabs class and removes it from all other tabs.
- User Story #5: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.
- User Story #6: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type using [marked.js](https://cdnjs.com/libraries/marked).
- User Story #7: When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.
- User Story #8: When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element.
