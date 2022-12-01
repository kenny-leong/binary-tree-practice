// Do not change this
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  insert(val, currentNode=this.root) {
    let newNode = new TreeNode(val);

    if (!currentNode) {
      this.root = newNode;
      return;
    }

    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
          return this.insert(val, currentNode.left)
      }
    } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
        } else {
            return this.insert(val, currentNode.right);
        }
    }


  }

  search(val, root = this.root) {

    if (root == null) return false;

    if (root.val == val) return true;

    if (this.search(val, root.left)) return true;

    return (this.search(val, root.right))
  }


  preOrderTraversal(currentNode = this.root) {

    if (currentNode == null) return;

    console.log(currentNode.val);

    this.preOrderTraversal(currentNode.left);
    this.preOrderTraversal(currentNode.right);
  }


  inOrderTraversal(currentNode = this.root) {

    if (currentNode == null) return;
    this.inOrderTraversal(currentNode.left);
    console.log(currentNode.val);
    this.inOrderTraversal(currentNode.right);

  }


  postOrderTraversal(currentNode = this.root) {

    if (currentNode == null) return;
    this.postOrderTraversal(currentNode.left);
    this.postOrderTraversal(currentNode.right);
    console.log(currentNode.val);
  }

    // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {

      let node = queue.shift();
      console.log(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Depth First Traversal - Iterative
  depthFirstTraversal() {

    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {

      let node = stack.pop();
      console.log(node.val);

      if (node.right) stack.push(node.left);
      if (node.left) stack.push(node.right);
    }
}

}

module.exports = { BinarySearchTree, TreeNode };
