export interface MessageType {
    role : 'user' | 'assistant' | 'system';
    content : string;
}