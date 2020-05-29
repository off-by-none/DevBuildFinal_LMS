DROP DATABASE IF EXISTS LMS
GO

CREATE DATABASE LMS
GO

USE LMS
GO

CREATE TABLE UserTable (
	userId int identity(1,1) primary key not null,
	userTypeId int not null,
	userName varchar(64)
);
GO

INSERT INTO UserTable
(userTypeId, userName)
VALUES 
(1, 'Admin'),
(2, 'Teacher'),
(3, 'Student'), 
(2, 'Peter'),
(3, 'Brandon'),
(3, 'Soc'),
(3, 'O'),
(2, 'Neil deGrasse Tyson'),
(2, 'Elon Musk'),
(2, 'Riley Shirk'),
(3, 'Mike McLean'),
(2, 'Ollie');
GO


CREATE TABLE UserTypeDIM (
	userTypeId int not null,
	userType varchar(16) not null
);
GO

INSERT INTO UserTypeDIM 
(userTypeId, userType)
VALUES 
(1, 'Admin'), 
(2, 'Teacher'),
(3, 'Student');
GO


CREATE TABLE Course (
	courseId int identity(1,1) primary key not null,
	courseName varchar(128) not null,
	assignedTeacherId int foreign key references UserTable(userId)
);
GO

INSERT INTO Course 
(courseName, assignedTeacherId)
VALUES 
('DevBuild3.0', 2),
('Front-end', 2),
('DevBuild2.0', 4),
('Physics', 8),
('Material Science', 9),
('Poetry 101', 6);
GO


CREATE TABLE StudentCourse (
	courseId int foreign key references Course(courseId),
	studentId int foreign key references UserTable(userId)
);
GO

INSERT INTO StudentCourse
(courseId, studentId)
VALUES 
(1, 3),
(1, 5),
(1, 6),
(1, 7),
(2, 3);
GO

CREATE TABLE Module (
	moduleID int identity(1,1) primary key not null,
	moduleName varchar(128) not null,
	courseId int foreign key references Course(courseId)
);
GO

INSERT INTO Module
(moduleName, courseId)
VALUES
('C# Basics', 1),
('Object-Oriented Programming', 1),
('Dapper', 1),
('Intro to VS Code',2),
('JavaScript', 2),
('HTML/CSS', 2),
('Visual Studio', 3),
('APIs & SQL', 3),
('Git Gumped', 3),
('Gravity is it real?',4),
('Light', 4),
('Comic Science', 4),
('What is Material Science', 5),
('The Big Four', 5),
('Thermodynamics', 5),
('What is Poetry?', 6),
('Metaphors', 6),
('Performance v Page', 6);


GO

CREATE TABLE Assignment (
	assignmentID int identity(1,1) primary key not null,
	assignmentName varchar(128) not null,
	moduleId int foreign key references Module(moduleId),
	assignmentURL varchar(512)
);
GO

INSERT INTO Assignment
(assignmentName, moduleId, assignmentURL)
VALUES
('FizzBuzz', 1, 'https://www.hackerrank.com/challenges/fizzbuzz/problem'),
('OOP Test', 2, 'https://www.proprofs.com/quiz-school/story.php?title=object-oriented-programming-basics'),
('Dapper One-Day Project', 3, 'http://docs.google.com/document/d/1-Y4JHFQocgTciKpj4U2hNTPhxZR8iNCJeYBYGinwVEk/edit'),
('JavaScript Gaulnet', 5, 'https://www.w3resource.com/javascript-exercises/javascript-basic-exercises.php'),
('Create a Webpage', 6, 'https://www.geeksforgeeks.org/top-10-projects-for-beginners-to-practice-html-and-css-skills/'),
('Learning Git', 8, 'https://opensource.com/article/19/5/practical-learning-exercise-git'),
('Gavitational Force', 9, 'https://studylib.net/doc/8521796/gravitational-force-worksheet'),
('Light Waves and Matter', 10, 'https://www.physicsclassroom.com/getattachment/curriculum/light/light1.pdf'),
('Material Science Worksheet', 11, 'https://study.com/academy/practice/quiz-worksheet-materials-science.html'),
('Thermodynamics', 13, 'https://www.yumpu.com/en/document/read/50393825/thermodynamics-worksheet'),
('Prompt for your Words', 14, 'https://www.readpoetry.com/22-poetry-prompts-to-help-you-write-your-next-great-poem/');

GO

CREATE TABLE Resources (
	resourceID int identity(1,1) primary key not null,
	resourceName varchar(128),
	moduleId int foreign key references Module(moduleId),
	resourceURL varchar(512)
);
GO

INSERT INTO Resources
(resourceName, moduleId, resourceURL)
VALUES
('Intro to C#', 1, 'https://www.youtube.com/watch?v=GhQdlIFylQ8'),
('OOP', 2, 'https://francescolelli.info/tutorial/object-oriented-programming-a-curated-set-of-resources/'),
('Dapper Video', 3, 'https://www.youtube.com/embed/eKkh5Xm0OlU'),
('Dapper Tutorial',3,'https://dapper-tutorial.net/dapper'),
('VS Code Tutorial', 4, 'https://www.youtube.com/watch?v=VqCgcpAypFQ'),
('JS Tutorial', 5, 'https://www.youtube.com/watch?v=W6NZfCO5SIk'),
('BootsWatch' ,6, 'https://bootswatch.com/'), 
('Visual Studio Tutorial', 7, 'https://www.youtube.com/watch?v=VqCgcpAypFQ'),
('SQL', 8, 'https://www.w3schools.com/sql/'),
('Git Hub Guides', 9, 'https://guides.github.com/activities/hello-world/'),
('Gravity', 10, 'https://spaceplace.nasa.gov/what-is-gravity/en/'),
('Light' ,11, 'https://www.britannica.com/science/light'),
('Comics!', 12, 'https://www.youtube.com/watch?v=IpTwsJaLvA4'),
('Material Science', 13, 'https://www.sciencedaily.com/terms/materials_science.htm'),
('The Big Four', 14, 'https://study.com/academy/lesson/materials-science-definition-material-classification.html'),
('Thermodynamics',15, 'https://courses.lumenlearning.com/introchem/chapter/the-three-laws-of-thermodynamics/'),
('Whats Poetry' ,16, 'http://www.poetry.org/whatis.htm'),
('Metaphors', 17, 'https://literaryterms.net/metaphor/'),
('Performance' ,18, 'https://www.youtube.com/watch?v=KJHquOEChRg');

GO


/*** STORED PROCS  ***/
--CREATE PROCEDURE SudentCourses
--AS
--SELECT
--  ut.userId
--, ut.userName
--, usertype.userType
--FROM [LMS].[dbo].[UserTable] ut
--	LEFT JOIN LMS.dbo.UserTypeDIM usertype ON usertype.userTypeId = ut.userTypeId
--GO;