const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  if (rootNode.left) return findMinBST(rootNode.left);
  if (!rootNode.left) return rootNode.val;
}

function findMaxBST (rootNode) {
  if (rootNode.right) return findMaxBST(rootNode.right);
  if (!rootNode.right) return rootNode.val;
}

function findMinBT (rootNode) {
  if (!rootNode) return;

  const stack = [];
  stack.push(rootNode);
  let minVal;

  while (stack.length > 0) {
    let node = stack.pop();

    if (node.val < minVal || minVal == undefined) minVal = node.val;

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return minVal;
}

function findMaxBT (rootNode) {
  if (!rootNode) return;

  const stack = [];
  stack.push(rootNode);
  let maxVal;

  while (stack.length > 0) {
    let node = stack.pop();

    if (node.val > maxVal || maxVal == undefined) maxVal = node.val;

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return maxVal;
}

// (RECURSIVE SOLUTION)
// function getHeight (rootNode, height=0) {
//   if (!rootNode) return -1;

//   if (rootNode.right == null && rootNode.left == null) return height;

//   let leftHeight = getHeight(rootNode.left, height+1);

//   let rightHeight = getHeight(rootNode.right, height+1);

//   if (leftHeight > rightHeight) return leftHeight;

//   else return rightHeight;
// }

// (ITERATIVE SOLUTION)
function getHeight (rootNode) {
  if (!rootNode) return -1;

  const stack = [rootNode];

  let maxHeight = 0;
  rootNode.height = 0;

  while (stack.length) {
    const curr = stack.pop();

    if (curr.height > maxHeight) maxHeight = curr.height;

    if (curr.left) {
      curr.left.height = curr.height + 1;
      stack.push(curr.left);
    }

    if (curr.right) {
      curr.right.height = curr.height + 1;
      stack.push(curr.right);
    }
  }
  return maxHeight;
}

function countNodes (rootNode) {
  if (!rootNode) return;

  const stack = [];
  stack.push(rootNode);
  let count = 0;

  while (stack.length > 0) {
    let node = stack.pop();

    if (node) count++;

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return count;
}

function balancedTree (rootNode, bool = true) {
  if (!rootNode) return bool;

  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);

  if (Math.abs(leftHeight - rightHeight) > 1) bool = false;

  let leftSide = balancedTree(rootNode.left, bool);
  let rightSide = balancedTree(rootNode.right, bool);

  if (leftSide && rightSide) return true;
  else return false;
}

function getParentNode (rootNode, target) {
  if (target == rootNode.val) return null;

  if (!rootNode) return;

  const stack = [];
  stack.push(rootNode);
  let parentNode;

  while (stack.length > 0) {
    let node = stack.pop();

    if (node.right) {
      if (node.right.val === target) parentNode = node;
      stack.push(node.right);
    }
    if (node.left) {
      if (node.left.val === target) parentNode = node;
      stack.push(node.left);
    }
  }
  return parentNode;
}

function inOrderPredecessor (rootNode, target, values=[]) {
  if (!rootNode) {
    return;
  } else if (values[0] == target) {
    return null;
  } else {
    for (let i=0; i<values.length; i++) {
      if (values[i] == target) {
        return values[i - 1]
      }
    }
  }

  let left = inOrderPredecessor(rootNode.left, target, values);

  values.push(rootNode.val)

  let right = inOrderPredecessor(rootNode.right, target, values);

  if (left) return left;
  else return right;

}


function deleteNodeBST(rootNode, target) {
  function _deleteNodeBST(rootNode, target) {
    if (!rootNode) return null;

    if (target < rootNode.val) { // TARGET IS TO THE LEFT.
      rootNode.left = _deleteNodeBST(rootNode.left, target);
    } else if (target > rootNode.val) { // TARGET IS TO THE RIGHT.
      rootNode.right = _deleteNodeBST(rootNode.right, target); // null
    } else { // FOUND THE TARGET! target === rootNode.val
      if (!rootNode.left && !rootNode.right) {
        // NO CHILDREN.
        return null;
      } else if (rootNode.left && rootNode.right) {
        // 2 CHILDREN.
        const predVal = inOrderPredecessor(rootNode, target);
        _deleteNodeBST(rootNode, predVal);
        rootNode.val = predVal;
      } else {
        // 1 CHILD.
        return rootNode.left ? rootNode.left : rootNode.right;
      }
    }

    return rootNode;
  }

  _deleteNodeBST(rootNode, target);
}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
