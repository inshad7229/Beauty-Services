import { CreateNewPasswordModule } from './create-new-password.module';

describe('CreateNewPasswordModule', () => {
    let createNewPasswordModule:CreateNewPasswordModule;

    beforeEach(() => {
        createNewPasswordModule = new CreateNewPasswordModule();
    });

    it('should create an instance', () => {
        expect(createNewPasswordModule).toBeTruthy();
    });
});
