class BSNode {
    constructor(root, node) {
        this.root = root;
        this.node = node || root;
        this.textContent = this.node.textContent;
        this.id = this.node.id;
    }

    xpath(path) {
        const result = this.root.evaluate(
            path, this.node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

        const out = [];
        let nextNode = result.iterateNext();
        while (nextNode != null) {
            out.push(new BSNode(this.root, nextNode));
            nextNode = result.iterateNext();
        }

        return out;
    }

    at_xpath(path) {
        const result = this.root.evaluate(
            path, this.node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        
        if (result.singleNodeValue != null) {
            return new BSNode(this.root, result.singleNodeValue);
        } else {
            return null;
        }
    }

    getAttribute(name) {
        return this.node.getAttribute(name);
    }
}

export default BSNode;