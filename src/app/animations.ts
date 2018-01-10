import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const ScaleDownUpAnimation: AnimationEntryMetadata =
  trigger('ScaleDown', [
    state('1',
      style({
        opacity: 0,
        transform: 'scale(.5)',  
      })
    ),

    state('2',
        style({
          opacity: 1,
          transform: 'scale(1)',        
        })
      ),
      
    transition('1 <=> 2' , animate('300ms ease-out')),
    
  ]);