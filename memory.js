const chatMemory = [];

export function addToMemory(userMessage, botResponse) {
  chatMemory.push({ role: "user", content: userMessage });
  chatMemory.push({ role: "assistant", content: botResponse });
  if (chatMemory.length > 20) chatMemory.splice(0, chatMemory.length - 20);
}

export function getMemory() {
  return [...chatMemory];
}

export function clearMemory() {
  chatMemory.length = 0;
}
