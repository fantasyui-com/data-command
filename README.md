# data-command
A revolutionary new way of combining application UI and their data needs.


```JavaScript

const dataCommand = require('data-command')();

const api = {};
api.stream = function(node, options){
  const path = options.source;
  const template = $(`#${options.template}`).children(0).clone();
  pookie.mount(path, reconciler({node, template}));
}

dataCommand.commands().forEach(function({node, commands}){
  commands.forEach(function(execute){
    api[execute.command](node, execute)
  })
}); // forEach

```


```HTML

<ul data-command="stream -w --source Applications/Todo/Today --template todo-item-template" class="list-group list-group-flush"></ul>

<div class="invisible template" id="todo-item-template">
    <li class="list-group-item bg-info text-white">
      <span data-variable="text"></span>
      <span data-variable="version"></span>
      <span data-variable="name"></span>
    </li>
</div>

```
