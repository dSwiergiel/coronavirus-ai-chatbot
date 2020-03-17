export interface MessageOutput {
  //   MessageID: number;
  MessageText: string;
  IsFromBot: boolean;
}
export interface MessageInput {
  inputText: string;
  sessionId: string;
}
