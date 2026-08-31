// Guards against third-party DOM mutation that crashes React.
//
// Browser translation (Google Translate) and some extensions / in-app browsers
// remove or reparent DOM nodes that React still owns. When React later tries to
// remove or move one of those nodes, the reconciler calls removeChild /
// insertBefore on a node that is no longer where it expects, and the browser
// throws NotFoundError. That error escapes into React's commit phase and
// white-screens the app (surfacing as the "Connection Interrupted" boundary).
//
// This patch makes those two calls no-op when the target isn't actually a child
// of the parent, instead of throwing. It only changes behaviour in the exact
// case that would otherwise crash; normal DOM operations are untouched. This is
// the widely used mitigation for the Google-Translate-breaks-React issue.

let installed = false;

export function installDomGuards() {
  if (installed || typeof Node === "undefined" || !Node.prototype) return;
  installed = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function removeChild(child) {
    if (child && child.parentNode !== this) {
      // The node was already detached/moved by an external script. React's
      // reconciler still cleans up its own tree correctly, so just hand the node
      // back rather than throwing.
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function insertBefore(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      // Reference node is no longer under this parent (external mutation);
      // fall back to appending so the insert can't throw NotFoundError.
      return originalInsertBefore.call(this, newNode, null);
    }
    return originalInsertBefore.apply(this, arguments);
  };
}
