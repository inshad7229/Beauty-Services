import { TransactionDetailsModule } from './transaction-details.module';

describe('TransactionDetailsModule', () => {
    let transactionDetailsModule: TransactionDetailsModule;

    beforeEach(() => {
        transactionDetailsModule = new TransactionDetailsModule();
    });

    it('should create an instance', () => {
        expect(transactionDetailsModule).toBeTruthy();
    });
});
