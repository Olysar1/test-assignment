The form generator:

The form generator lets us generate form with input fields of type "text", "checkbox" and "select".

To add a simple field to the generated form we can fill "Select input type" and "Input field label" fields and click on "add field" button.

If we want to generate a select element we will have to add select element options. We can add select element options by filling "Input select field options" field and pressing "add option" button. We also have a functionality to remove options that were submitted incorrectly by pressing delete button along the option.

If we want our component to have an optional logic we can check the input field "Has conditional logic" which will then show fields to help us attach conditional logic to our element.

To attach conditional logic we need to fill the "Relative element label" field - which must contain the label of the relative element and "Value to track" field - which will contain the value that will trigger displaying of our newly generated element. If the Relative element is "checkbox" we need to input "true" or "false" in the "Value to track" field in order to make it work for cases when the checkbox is respectively checked or not checked.

Generated labels are automatically converted into camelcase and used as names in the generated form. If generated elements label is "some new element" in the generated form the field will be named - "someNewElement" and this name will also be used as a key in the object generated by our generated form: {someNewElement: ...}. It is important to match "Relative element label" with the label of already existent element label.

We can fill out the generated form and click on submit. the resulted object will be logged into the console.
