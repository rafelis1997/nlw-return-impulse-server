import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
)

describe('submit feedback', ()=>{
  it('should be able to submit a feedback', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,asdhuashdu',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64,sahudhsauhd',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,sahudhsauhd',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot format.', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'data:image/jpg;',
    })).rejects.toThrow();
  });
});