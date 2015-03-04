var RadioCheckView=React.createClass({displayName:"RadioCheckView",render:function(){var e=this.props.item,t=e.value?e.value:e.label,a=""+this.props.idx+this.props.name;return React.DOM.div({className:"elem-radio-check"},React.DOM.input({id:a,name:this.props.name,type:this.props.type,value:t,onChange:this.props.onChange}),React.DOM.label({htmlFor:a},e.label))}}),RadioCheckBlock=React.createClass({displayName:"RadioCheckBlock",onChange:function(e){this.props.handleChange(e.target.value,this.props.idx)},render:function(){var e=this.props.item.data.map(function(e,t){return RadioCheckView({name:this.props.idx,key:t,item:e,idx:t,type:this.props.item.type,onChange:this.onChange})},this);return React.DOM.div(null,e)}}),QuestionView=React.createClass({displayName:"QuestionView",onChange:function(e){var t=e.target.getAttribute("data-id");this.props.handleChange(e.target.value,t)},getElement:function(e,t){if("text"==e.type)return React.DOM.input({"data-id":t,type:"text",value:e.val,onChange:this.onChange});if("radio"==e.type||"checkbox"==e.type)return RadioCheckBlock({idx:t,item:e,key:t,handleChange:this.props.handleChange});if("textarea"==e.type)return React.DOM.textarea({"data-id":t,value:e.val,rows:e.rows,onChange:this.onChange});throw'type not found "'+e.type+'", index: '+t},render:function(){var e=this.props.item,t="q-title";return e.error&&(t+=" error"),React.DOM.div({className:"question"},React.DOM.label({className:t},e.label),React.DOM.div({className:"q-answer"},this.getElement(e,this.props.idx)))}}),FormView=React.createClass({displayName:"FormView",getInitialState:function(){var e=this.props.data.schema;return e.map(function(e){e.required=!0,e.error=!1,e.val="checkbox"==e.type?[]:""}),{schema:e}},getConditional:function(e){if("="==e)return function(e,t){return""+e==""+t};if("<>"==e)return function(e,t){return""+e!=""+t};throw"skip  conditional not found :"+e},handleChange:function(e,t){var a=this.state.schema,i=a[t],n=e;if(i.error=!1,"checkbox"==i.type){var r=i.val.indexOf(e);-1==r?i.val.push(e):i.val.splice(r,1),n=i.val.length}else i.val=e;if(i.skip)for(var s=this.getConditional(i.skip.cond),o=!s(n,i.skip.val),h=0;h<i.skip.to.length;h++)a[i.skip.to[h]].required=o;this.setState({schema:a})},handleSubmit:function(e){e.preventDefault();for(var t,a=this.state.schema,i=a.length,n=[],r=[],s=0;i>s;s++)r.push(a[s].val),t="",a[s].required&&""==a[s].val&&(t="error"),n.push(t),a[s].error=t.length>0;this.setState({schema:a}),t.length||this.props.data.onSubmit(r)},render:function(){var e=this.props.data.submitButton,t=this.state.schema.map(function(e,t){return QuestionView({key:t,item:e,idx:t,handleChange:this.handleChange})},this);return React.DOM.div({className:"form"},React.DOM.div({className:"title"},this.props.data.title),React.DOM.form({onSubmit:this.handleSubmit},t,React.DOM.button({className:"submit-btn"},e.text)))}});