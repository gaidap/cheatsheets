export default function allowNode(node, index, parent) {
  var nodeany = node;

  if (nodeany.type === 'html') {
    // filter style
    node.value = node.value.replace(/<((style|script|link|input|form)|\/(style|script|link|input|form))(\s?[^>]*>)/gi, function (a) {
      return a.replace(/[<>]/g, function (e) {
        return {
          '<': '&lt;',
          '>': '&gt;'
        }[e];
      });
    });
  }

  return true;
} 
//# sourceMappingURL=allowNode.js.map