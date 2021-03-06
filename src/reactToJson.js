/** @jsx React.DOM */

var RadioCheckView = React.createClass({
  render: function() {
    var item = this.props.item;
    var val = item.value ? item.value: item.label;
    var id = ''+this.props.idx + this.props.name;
    return(
      <div className = 'elem-radio-check'>
        <input 
          id = {id}
          name = {this.props.name}
          type = {this.props.type}
          value = {val}
          onChange = {this.props.onChange} />
        <label 
          htmlFor = {id}>
          {item.label}
        </label>
      </div>
    );
  }
});

var RadioCheckBlock = React.createClass({
  onChange: function(e) {
    this.props.handleChange(e.target.value, this.props.idx);
  },
  render: function() {
    var items =  this.props.item.data.map(function(item, i) {
      return (
        <RadioCheckView 
          name ={this.props.idx}
          key = {i}
          item = {item}
          idx = {i}
          type = {this.props.item.type}
          onChange = {this.onChange} />
      );
    }, this);
    return(
      <div>
        {items}
      </div>
    );
  }
});

var QuestionView = React.createClass({
  onChange: function(e) {
    var idx = e.target.getAttribute('data-id');
    this.props.handleChange(e.target.value, idx);
  },
  getElement: function(item, i) {
    if (item.type == 'text') {
      return (
        <input
          data-id = {i} 
          type='text' 
          value = {item.val} 
          onChange = {this.onChange} />
      );
    }
    if (item.type == 'radio' || item.type == 'checkbox') {
      return (
        <RadioCheckBlock 
          idx = {i}
          item = {item} 
          key = {i}
          handleChange = {this.props.handleChange} />
      )
    }     
    if (item.type == 'textarea') {
      return (
        <textarea 
          data-id = {i}
          value = {item.val}
          rows = {item.rows}
          onChange = {this.onChange} />
      );
    }

    throw 'type not found "'+item.type+ '", index: '+ i
  },
  render: function() {
    var item = this.props.item;
    var classLabel = 'q-title';
    if (item.error) {
      classLabel += ' error';
    }
    return (
      <div className = 'question'>
        <label 
          className = {classLabel}>
          {item.label}
        </label>
        <div 
          className = 'q-answer'>
          {this.getElement(item, this.props.idx)}
        </div>
      </div>
    );
  }
});

var FormView = React.createClass({
  getInitialState: function() {
    var schema = this.props.data.schema;
    schema.map(function(item) {
      item.required = true;
      item.error = false;
      if (item.type == 'checkbox') {
        item.val = [];
      } else {
        item.val = '';
      }
    });
    return {
      schema: schema
    }
  },
  getConditional: function(symbol) {
    if (symbol == '=') {
      return function(elem1, elem2) {
        return ''+elem1 == ''+elem2;
      }
    }
    if (symbol == '<>') {
      return function(elem1, elem2) {
        return ''+elem1 != ''+elem2;
      }
    }

    throw 'skip  conditional not found :'+symbol
  },
  handleChange: function(newValue, idx) {
    var schema = this.state.schema;
    var item = schema[idx];
    var valToEvaluate = newValue;
    item.error = false;

    if (item.type == 'checkbox') {
      var pos = item.val.indexOf(newValue);
      if (pos == -1) {
        item.val.push(newValue);
      } else {
        item.val.splice(pos, 1);
      }
      valToEvaluate = item.val.length;
    } else {
      item.val = newValue;
    }    

    if (item.skip) {
      var conditional = this.getConditional(item.skip.cond);
      var required = !conditional(valToEvaluate, item.skip.val);

      for (var i = 0; i < item.skip.to.length; i++) {
        schema[item.skip.to[i]].required = required;
      };
    }
    this.setState({
      schema: schema
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var schema = this.state.schema;
    var len = schema.length;
    var errors = [];
    var values = [];
    var err;
    for (var i = 0; i < len; i++) {
      values.push(schema[i].val);
      err = '';
      if (schema[i].required && schema[i].val == '') {
        err = 'error';
      }
      errors.push(err);
      
      schema[i].error = err.length > 0;
      
    };
    
    this.setState({
      schema: schema
    });
    if (!err.length) {
      this.props.data.onSubmit(values);
    }
  },
  render: function() {
    var submitButton = this.props.data.submitButton;
    var items =  this.state.schema.map(function(item, i) {
      return (
        <QuestionView 
          key = {i}
          item = {item}
          idx = {i}
          handleChange = {this.handleChange} />
      );
    }, this);
    return(
      <div className = 'form'>
        <div className = 'title'>{this.props.data.title}</div>
        <form onSubmit={this.handleSubmit}>
          {items}
          <button className = 'submit-btn'>{submitButton.text}</button>
        </form>
      </div>
    );
  }
});
