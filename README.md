# react-json-to-survey
Easy way to build a survey from a json schema.

##Elements

We need to create a JSON which is composed of 4 parts:

1. Schema:
   Array of fields (input text, text area, radio, checkbox)
2. Title:
   (Optional) Title of the survey
3. submitButton:
   **text** field -> title of the submit button
4. onSubmit:
   Function that will get the results after submit button is pressed and there are no errors on the survey.

You can see the example section to see more detail about 2,3 and 4 parts.

### Input text

```javascript
   {
      'type': 'text',
      'label': '1. First question',
   }
```

###Text area
```javascript
   {
      'type': 'area',
      'label': '2. Second question',
   }
```

###Radio button
   Value attribute is optional. If value attribute is not found value will be set to corresponding label.

```javascript
   {
      'type': 'radio',
      'label': 'n. Any Question',
      'data': [
         {'value': '1', 'label': 'option 1'},
         {'value': '2', 'label': 'option 2'},
         {'value': '3', 'label': 'option 3'}
      ]
   }
```

###CheckBox button
   Value attribute is optional. If value attribute is not found value will be set to corresponding label.

```javascript
   {
      'type': 'checkbox',
      'label': 'm. Another question',
      'data': [
         {'value': '1', 'label': 'option 1'},
         {'value': '2', 'label': 'option 2'},
         {'value': '3', 'label': 'option 3'}
      ]
   }
```

##Skip to question
In most surveys, responding one question could lead to skipping some question. For example, if you choose yes (on radio button) on question 1 you will skip to question 4. Lets see how we would do it:

```javascript
   {
      'type': 'radio',
      'label': '1. answers yes or no',
      'data': [
         {'value': 'yes', 'label': 'yes'},
         {'value': 'no', 'label': 'no'}
      ],
      'skip': {
         'cond': '=', //condition could be = or <>
         'val': 'yes', 
         'to': [2,3] //which questions need to be skipped
      }
   }
```

In this example, answers **yes** you would skip questions 2 and 3.

You can choose in condition field **cond** between **=** (equal) and **<>** (not equal).

Only in the case of **checkbox** you would get an array as a result and you can only use length as a comparison. example:

```javascript
   {
      'type': 'checkbox',
      'label': '5. question',
      'data': [
         {'value': '1', 'label': 'text5'},
         {'value': '2', 'label': 'text6'},
         {'value': '3', 'label': 'text7'}
      ],
      'skip': {
         'cond': '<>',
         'val': '0',
         'to': [0]
      }
   }
```

In this example **val** will be compared to the length of the array, which is composed of the value of checkboxes selected.


##Dependencies

```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js"></script>
   <script src="reactToJson.js"></script>
```
##Example

```html
<div id='app'></div>
<script>
var submit = function(values) {
  console.log('field values array ', values);
}
var data = {
  'schema': 
  [
    {
      'type': 'text',
      'label': '1. question ',
      'skip': {
        'cond': '<>',
        'val': '',
        'to': [1]
      }
    },
    {
      'type': 'text',
      'label': '2. Second question'
    },
    {
      'type': 'textarea',
      'label': '3. Another question'
    },
    {
      'type': 'radio',
      'label': '4. another?',
      'data': [
        {'value': '1', 'label': 'text1'},
        {'value': '2', 'label': 'text2'},
        {'value': '3', 'label': 'text3'}
      ]
    },
    {
      'type': 'checkbox',
      'label': '5. You almost finish',
      'data': [
        {'value': '1', 'label': 'text5'},
        {'value': '2', 'label': 'text6'},
        {'value': '3', 'label': 'text7'}
      ],
      'skip': {
        'cond': '<>',
        'val': '0',
        'to': [0]
      }
    },
    {
      'type': 'radio',
      'label': '6. This is the last one',
      'data': [
        {'label': 'text5'},
        {'label': 'text6'},
        {'label': 'text7'}
      ]
    }
  ],
  'title': 'Title here',
  'submitButton': {
    'text': 'Send'
  },
  'onSubmit': submit
}
    
React.renderComponent( 
  FormView({data: data}), document.getElementById('app')
);
</script>
```

##Demo

Check live demo here [Demo](http://juancjara.github.io/react-json-to-survey/)
