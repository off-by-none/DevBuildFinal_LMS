/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TeacherComponent } from './teacher.component';

let component: TeacherComponent;
let fixture: ComponentFixture<TeacherComponent>;

describe('teacher component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TeacherComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TeacherComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});