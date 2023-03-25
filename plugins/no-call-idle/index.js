const nodes = Object.values(shelter.flux.dispatcher._actionHandlers._dependencyGraph.nodes).find((n) => n.name === "CallIdleStore");
const patches = Object.keys(nodes.actionHandler).map((k) => shelter.patcher.instead(k, nodes.actionHandler, () => {}));

export const onUnload = () => patches.forEach((unpatch) => unpatch());
