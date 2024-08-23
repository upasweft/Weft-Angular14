import { trigger, style, animate, transition, stagger, keyframes, query, state } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const AnimationGroup = [
    trigger(
      'surveyLoopStateAnimation', [
        state('upward-inactive', style({ opacity: 1 })),
        state('upward-active', style({ opacity: 1 })),
        state('downward-inactive', style({ opacity: 1 })),
        state('downward-active', style({ opacity: 1 })),
        transition('upward-inactive => upward-active', [
            animate('1s ease-in', keyframes([
                style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(-50%)', offset: 0.2 }),
                style({ opacity: 0, transform: 'translateY(-100%)', offset: 0.4 }),
                style({ opacity: 0, transform: 'translateY(100%)', offset: 0.6 }),
                style({ opacity: 0.5, transform: 'translateY(50%)', offset: 0.8 }),
                style({ opacity: 1, transform: 'translateY(0%)', offset: 1.0 }),
            ]))
        ]),
        transition('downward-inactive => downward-active', [
            animate('1s ease-in', keyframes([
                style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(50%)', offset: 0.2 }),
                style({ opacity: 0, transform: 'translateY(100%)', offset: 0.4 }),
                style({ opacity: 0, transform: 'translateY(-100%)', offset: 0.6 }),
                style({ opacity: 0.5, transform: 'translateY(-50%)', offset: 0.8 }),
                style({ opacity: 1, transform: 'translateY(0%)', offset: 1.0 }),
            ]))
        ]),
        transition('downward-inactive => upward-active', [
            animate('1s ease-in', keyframes([
                style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(-50%)', offset: 0.2 }),
                style({ opacity: 0, transform: 'translateY(-100%)', offset: 0.4 }),
                style({ opacity: 0, transform: 'translateY(100%)', offset: 0.6 }),
                style({ opacity: 0.5, transform: 'translateY(50%)', offset: 0.8 }),
                style({ opacity: 1, transform: 'translateY(0%)', offset: 1.0 }),
            ]))
        ])
    ]),
    trigger(
      'surveyLoopAnimation', [
        transition('* => *', [

            query(':enter', style({ opacity: 0 }), { optional: true }),
    
            query(':enter', stagger('300ms', [
              animate('1s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(100%)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(50%)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
              ]))]), { optional: true }),
    
            query(':leave', stagger('300ms', [
              animate('1s ease-in', keyframes([
                style({ opacity: 1, transform: 'translateY(100%)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(150%)', offset: 0.3 }),
                style({ opacity: 0, transform: 'translateY(200%)', offset: 1.0 }),
              ]))]), { optional: true })
        ])
      ]
    ),
    trigger(
      'surveyAnimation', [
        transition(':enter', [
          style({transform: 'translateY(0)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(100%)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(200%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'opacityAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('300ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('0ms', style({opacity: 0}))
        ])
      ]
    ),
    trigger(
        'enterAnimation', [
          transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
          ])
        ]
    ),
    trigger(
        'scaleAnimation', [
          transition(':enter', [
            style({transform: 'scale(0)', opacity: 0}),
            animate('300ms', style({transform: 'scale(1)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'scale(1)', opacity: 1}),
            animate('300ms', style({transform: 'scale(0)', opacity: 0}))
          ])
        ]
    ),
    trigger(
        'dashFooterAnimation', [
            transition(':enter', [
              style({transform: 'translateY(70px)', opacity: 0}),
              animate('300ms', style({transform: 'translateY(0px)', opacity: 1}))
            ]),
            transition(':leave', [
              style({transform: 'translateX(0px)', opacity: 1}),
              animate('300ms', style({transform: 'translateY(70px)', opacity: 0}))
            ])
        ]
    ),
    trigger(
        'heightAnimation', [
            transition(':enter', [
              style({transform: 'scaleY(0)'}),
              animate('200ms', style({transform: 'scaleY(1)'}))
            ]),
            transition(':leave', [
              style({transform: 'scaleY(1)'}),
              animate('0ms', style({transform: 'scaleY(0)'}))
            ])
        ]
    ),
    trigger(
        'widthAnimation', [
            transition(':enter', [
              style({transform: 'scaleX(0)'}),
              animate('300ms', style({transform: 'scaleX(1)'}))
            ]),
            transition(':leave', [
              style({transform: 'scaleX(1)'}),
              animate('300ms', style({transform: 'scaleX(0)'}))
            ])
        ]
    )
];