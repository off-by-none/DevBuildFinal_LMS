/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { MyCoursesComponent } from './my-courses.component';

let component: MyCoursesComponent;
let fixture: ComponentFixture<MyCoursesComponent>;

describe('my-courses component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MyCoursesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(MyCoursesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});