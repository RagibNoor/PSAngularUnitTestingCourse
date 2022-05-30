import {MessageService} from "./message.service";

describe('Message Service' , () => {
  let  messages: string[];
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  })

  it('Should have no message on start', () => {
    expect(messageService.messages.length).toBe(0);
  })

  it('Should add message when add method is called', () => {
    messageService.add('Message added');

    expect(messageService.messages.length).toBe(1);
  })

  it('Should clear message when clear method is called', () => {
    messageService.add('Message added');
    messageService.clear()

    expect(messageService.messages.length).toBe(0);
  })
})
