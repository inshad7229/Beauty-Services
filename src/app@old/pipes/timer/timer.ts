import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TimerPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number): string {
  	   const hours :any = ('00'+ Math.floor(value/3600)).slice(-2)
       const minutes: any = ('00'+ Math.floor((value-hours*3600)/60)).slice(-2);
       return hours+'hours'+':' +minutes +'min'+ ':' + ('00'+Math.floor(value-(hours*3600+minutes * 60))).slice(-2)+'sec';
    }
}
