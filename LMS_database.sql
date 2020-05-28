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
(2, 'Elon Musk');
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
('Material Science', 9);
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
('Dapper', 1);
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
('Dapper One-Day Project', 3, 'http://docs.google.com/document/d/1-Y4JHFQocgTciKpj4U2hNTPhxZR8iNCJeYBYGinwVEk/edit')
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
('Dapper Video', 3, 'https://www.youtube.com/embed/eKkh5Xm0OlU')
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