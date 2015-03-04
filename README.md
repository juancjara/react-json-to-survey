# react-json-to-survey
Easy way to build a survey from a json schema.

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
      'label': '1. camp',
      'skip': {
        'cond': '<>',
        'val': '',
        'to': [1]
      }
    },
    {
      'type': 'text',
      'label': '2. camp2'
    },
    {
      'type': 'textarea',
      'label': '3. camp5'
    },
    {
      'type': 'radio',
      'label': '4. camp3',
      'data': [
        {'value': '1', 'label': 'text1'},
        {'value': '2', 'label': 'text2'},
        {'value': '3', 'label': 'text3'}
      ]
    },
    {
      'type': 'checkbox',
      'label': '5. camp8',
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
      'label': '6. camp10',
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
