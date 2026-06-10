const {
	flux: {
		storesFlat: {
			UserStore,
		},
		intercept,
	},
} = shelter;

let currentId = UserStore.getCurrentUser().id;
const currentMention = () => `<@${currentId}>`;

// Might as well just do this instead of subscribing
export const onUnload = intercept((data) => {
	if (data.type === "CONNECTION_OPEN") {
		currentId = data.user.id;
	}

	if (data.type !== "MESSAGE_CREATE" && data.type !== "MESSAGE_UPDATE") return;
	const { message } = data;

	if (message.referenced_message?.author?.id !== currentId) return;
	if (!message.mentions.some((m) => m.id === currentId)) return;
	if (message.content.includes(currentMention())) return;

	message.mentions = message.mentions.filter((m) => m.id !== currentId);
});
