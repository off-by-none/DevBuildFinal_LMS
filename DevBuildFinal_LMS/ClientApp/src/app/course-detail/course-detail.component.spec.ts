/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CourseDetailComponent } from './course-detail.component';

let component: CourseDetailComponent;
let fixture: ComponentFixture<CourseDetailComponent>;

describe('course-detail component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CourseDetailComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(CourseDetailComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});