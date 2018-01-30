import { MyAppointmentsModule } from './my-appointments.module';

describe('MyAppointmentsModule', () => {
    let myAppointmentsModule:MyAppointmentsModule;

    beforeEach(() => {
        myAppointmentsModule = new MyAppointmentsModule();
    });

    it('should create an instance', () => {
        expect(myAppointmentsModule).toBeTruthy();
    });
});
