/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CoursesComponent } from './courses.component';

let component: CoursesComponent;
let fixture: ComponentFixture<CoursesComponent>;

describe('courses component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CoursesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});