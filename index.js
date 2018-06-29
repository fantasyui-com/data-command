const sizzle = require('sizzle');
const minimist = require('minimist');

module.exports = function(options){

  const commands = function(){
    const nodes = sizzle('*[data-command]');

    return nodes.map(function(node){
      const command = node.dataset.command;
      const commands = [];

      command.split("|").forEach( function(input){

        const cargv = input.match(/\\?.|^$/g).reduce((p, c) => {
        if(c === '"'){
            p.quote ^= 1;
        }else if(!p.quote && c === ' '){
            p.a.push('');
        }else{
            p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
        }
        return  p;
        }, {a: ['']}).a

        const cleaned = cargv.filter(i=>i);
        const optionized = minimist(cleaned);

        const command = {};

        if(optionized._.length > 0){
          command.program = optionized._.shift();
          if (optionized._.length == 0){
            delete optionized._;
          }
        }

        Object.assign(command, node.dataset, optionized)


        commands.push(command);

      })

      return {node, commands}
    });

  }

  return {commands}

}
