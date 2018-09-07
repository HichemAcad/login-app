import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appNospace]'
})

export class NoSpaceDirective {
    @HostListener('blur', ['$event.target']) onblur(traget: HTMLInputElement) {
        if (traget.value.indexOf(' ') > 0) {
            traget.value = traget.value.split(' ').join('');
        }
    }
}
